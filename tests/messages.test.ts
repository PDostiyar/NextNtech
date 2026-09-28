import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import fa from "@/messages/fa.json";
import ps from "@/messages/ps.json";

type Tree = { [k: string]: string | Tree };
const keys = (t: Tree, prefix = ""): string[] =>
  Object.entries(t).flatMap(([k, v]) => (typeof v === "string" ? [prefix + k] : keys(v, `${prefix}${k}.`)));

// Keys that intentionally fall back to English (share messages are pre-written per network).
const ENGLISH_ONLY = /^share\.text/;

describe("translations", () => {
  const enKeys = keys(en).filter((k) => !ENGLISH_ONLY.test(k));
  it.each([
    ["fa", fa],
    ["ps", ps],
  ] as const)("%s has every UI string", (_l, messages) => {
    const have = new Set(keys(messages as Tree));
    expect(enKeys.filter((k) => !have.has(k))).toEqual([]);
  });
});
