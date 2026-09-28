import { Star8 } from "./Star8";

/** Star mark + wordmark: "NextN" (white) "Tech" (saffron) ".org" (turquoise). */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2" dir="ltr">
      <Star8 size={size} />
      <span className="text-[19px] font-extrabold text-white">
        NextN<span className="text-saffron">Tech</span>
        <span className="text-turquoise">.org</span>
      </span>
    </span>
  );
}
