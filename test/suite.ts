export * from "jsr:@std/testing/bdd";
export * from "jsr:@std/expect";

import { Async, expect as $expect, Expected } from "jsr:@std/expect";
import { isGlyph } from "../glyph.ts";

// Extends the `Expected` interface with your new matchers signatures
interface ExtendedExpected<IsAsync = false> extends Expected<IsAsync> {
  // Matcher that asserts value is a dinosaur
  toMatchBox: (options: string[]) => unknown;

  // NOTE: You also need to overrides the following typings to allow modifiers to correctly infer typing
  not: IsAsync extends true ? Async<ExtendedExpected<true>>
    : ExtendedExpected<false>;
  resolves: Async<ExtendedExpected<true>>;
  rejects: Async<ExtendedExpected<true>>;
}

$expect.extend({
  toMatchBox(context, options: string[]) {
    let glyph = context.value;
    if (!isGlyph(glyph)) {
      return {
        pass: false,
        message: () => `expected to match a border path`,
      };
    }
    let drawing: string[][] = Array(glyph.area.height).fill(null).map(() => Array(glyph.area.width).fill(null).map(() => " "));
    for (let pixel of glyph.pixels) {
      let row = drawing[pixel.offset.top];
      if (!row) {
        row = drawing[pixel.offset.top] = [];
      }
      row[pixel.offset.left] = pixel.char;
    }
    let generated = drawing.map((row) => row.join("")).join("\n");
    let expected = options.join("\n");

    let pass = generated === expected;

    return {
      pass,
      message: () =>
        `expected border box to be \n<===${
          expected === "" ? "" : "\n"
        }${expected}\n<=== \nbut was:\n<===${
          generated === "" ? "" : "\n"
        }${generated}\n<===`,
    };
  },
});

export const expect = $expect<ExtendedExpected>;
