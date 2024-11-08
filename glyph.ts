import { Glyph } from "./types.ts";

export function isGlyph(value: unknown): value is Glyph {
  let p = value as Glyph;
  return (p && Array.isArray(p.pixels));
}
