import { Pixel } from "./types.ts";

export function pixel(top: number, left: number, char: string): Pixel {
  return { offset: { top, left }, char: char[0] };
}
