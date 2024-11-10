import { lift, resource } from "effection";

export const say = lift((str: string) =>
  Deno.stdout.writeSync(new TextEncoder().encode(str))
);

const enterAlternateBuffer = () => say("\x1b[?1049h");

const exitAlternateBuffer = () => say("\x1b[?1049l");

export const clearBuffer = () => say("\x1b[2J");

export const hideCursor = () => say("\x1b[?25l");

export const showCursor = () => say("\x1b[?25h");

export const setCursor = (row: number, column: number) =>
  say("\x1b[" + row + ";" + column + "H");

export function useAlternateBuffer() {
  return resource<void>(function* (provide) {
    yield* enterAlternateBuffer();
    try {
      yield* clearBuffer();
      yield* provide();
    } finally {
      yield* clearBuffer();
      yield* exitAlternateBuffer();
    }
  });
}
