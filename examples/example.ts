import { main, Operation, suspend } from "effection";
import { initScreen } from "../screen.ts";
import { render } from "../render.ts";

export function example(content: () => Operation<void>) {
  return main(function* () {
    yield* initScreen();

    yield* render(content);

    yield* suspend();
  });
}
