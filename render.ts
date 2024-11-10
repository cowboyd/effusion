import { call, Operation } from "effection";
import { useUIParent } from "./node.ts";
import { useScreen } from "./screen.ts";

export function render(content: () => Operation<void>) {
  return call(function* () {
    const parent = yield* useUIParent();

    for (let child of parent.content) {
      yield* child.remove();
    }

    yield* content();

    let screen = yield* useScreen();

    yield* screen.flush();
  });
}
