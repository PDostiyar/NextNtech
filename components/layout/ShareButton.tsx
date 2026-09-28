"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button, type ButtonKind } from "@/components/ui/Button";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextntech.org";

type Network = "X" | "LinkedIn" | "Facebook" | "Instagram";
const NETWORKS: { name: Network; ref: string; color: string }[] = [
  { name: "X", ref: "share-x", color: "#000000" },
  { name: "LinkedIn", ref: "share-li", color: "#0A66C2" },
  { name: "Facebook", ref: "share-fb", color: "#1877F2" },
  { name: "Instagram", ref: "share-ig", color: "#C13584" },
];

function shareUrl(network: Network, link: string, text: string) {
  const e = encodeURIComponent;
  switch (network) {
    case "X":
      return `https://twitter.com/intent/tweet?text=${e(text)}`;
    case "Facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${e(link)}&quote=${e(text)}`;
    case "LinkedIn":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${e(link)}`;
    case "Instagram":
      return null; // no web share URL — copy the caption instead
  }
}

/** "Invite a friend" button + share dialog with a customized message per network. */
export function ShareButton({
  label,
  kind = "primary",
  className,
}: {
  label: string;
  kind?: ButtonKind;
  className?: string;
}) {
  const t = useTranslations("share");
  const dialog = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Button kind={kind} className={className} onClick={() => dialog.current?.showModal()}>
        {label}
      </Button>
      <dialog
        ref={dialog}
        aria-labelledby="share-title"
        onClose={() => setCopied(false)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-[480px] rounded-[18px] p-0 text-start backdrop:bg-ink/55"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <h2 id="share-title" className="mb-1 text-lg font-extrabold text-ink">
            {t("title")}
          </h2>
          <p className="mb-4 text-sm text-body">{t("sub")}</p>
          <div className="grid gap-3">
            {NETWORKS.map((n) => {
              const link = `${SITE}/register?ref=${n.ref}`;
              const text = t(`text${n.name}`, { url: link });
              const href = shareUrl(n.name, link, text);
              const btn =
                "block w-full rounded-[10px] px-3.5 py-3 text-center text-[15px] font-bold text-white";
              return (
                <div key={n.name}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btn}
                      style={{ background: n.color }}
                    >
                      {t("shareOn", { network: n.name })}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => copy(text)}
                      className={btn}
                      style={{ background: n.color }}
                    >
                      {copied ? t("copied") : t("copyCaption")}
                    </button>
                  )}
                  <p className="mt-1.5 rounded-[10px] border border-line bg-paper p-3 text-[13px] leading-normal text-body">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-end">
            <Button kind="ghost" size="sm" onClick={() => dialog.current?.close()}>
              {t("close")}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
