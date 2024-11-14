import { main, Operation, suspend } from "effection";
import { initScreen } from "../screen.ts";
import { render } from "../render.ts";
import { Box } from "../box.ts";

await main(function* (): Operation<void> {
  yield* initScreen();

  yield* render(function* () {
    yield* Box({
      height: "100%",
      width: "100%",
      border: true,
      padding: 1,
      alignItems: "flex-start",
    }, function* () {
      yield* Box({ height: 10, width: 20, border: true });
      yield* Box({ height: 10, width: 20, border: true, alignSelf: "center" });
    });
  });

  yield* suspend();
});
