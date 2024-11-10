import { createContext, Operation } from "effection";
import { Area, Glyph, Offset } from "./types.ts";
import { UINode } from "./node.ts";
import { clearBuffer, say, setCursor } from "./terminal.ts";

export interface Screen {
  draw(glyph: Glyph, offset: Offset): void;
  flush(): Operation<void>;
  resize(area: Area): Operation<void>;
}

const ScreenContext = createContext<Screen>("@effusive/screen");

export function useScreen() {
  return ScreenContext.expect();
}

export function initScreen(area: Area, root: UINode): Operation<Screen> {
  return ScreenContext.set(createScreen(area, root));
}

function createScreen(area: Area, root: UINode): Screen {
  let { height, width } = area;

  let current = fit([]);
  let next = fit([]);

  function fit(buffer: string[][]) {
    buffer.length = height;
    for (let i = 0; i < buffer.length; i++) {
      let row = buffer[i];
      if (!row) {
        row = buffer[i] = [];
        row.length = width;
        row.fill(" ");
      } else {
        let original = row.length;
        let diff = width - original;
        row.length = width;
        if (diff > 0) {
          row.fill(" ", original);
        }
      }
    }
    return buffer;
  }

  let screen: Screen = {
    *flush() {
      root.yoga.setWidth(width);
      root.yoga.setHeight(height);
      root.yoga.calculateLayout(width, height);

      yield* paint(root, screen);

      let pendown = false;
      for (let i = 0; i < next.length; i++) {
        let row = next[i];
        for (let j = 0; j < row.length; j++) {
          let currentValue = current[i][j];
          let nextValue = row[j];
          if (currentValue !== nextValue) {
            if (!pendown) {
              pendown = true;
              yield* setCursor(i + 1, j + 1);
            }
            yield* say(nextValue);
          } else {
            pendown = false;
          }
        }
      }
      current = next;
      next = fit([]);
    },

    *resize(area) {
      console.log({ area });
      height = area.width;
      width = area.height;
      current = fit([]);
      next = fit([]);
      yield* clearBuffer();
      yield* screen.flush();
    },

    draw(glyph: Glyph, offset: Offset) {
      for (let pixel of glyph.pixels) {
        let top = offset.top + pixel.offset.top;
        let left = offset.left + pixel.offset.left;
        let row = next[top];
        if (row) {
          row[left] = pixel.char;
        }
      }
    },
  };
  return screen;
}

function* paint(node: UINode, screen: Screen): Operation<void> {
  let { height, width } = node.yoga.getComputedLayout();

  let glyph = node.paint({ height, width });

  screen.draw(glyph, node.offset);

  for (let child of node.content) {
    yield* paint(child, screen);
  }
}
