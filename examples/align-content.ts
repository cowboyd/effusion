import { main, suspend } from "effection";
import { Box } from "../box.ts";
import { render } from "../render.ts";
import { initScreen } from "../screen.ts";

await main(function* () {
  yield* initScreen();

  yield* render(function* () {
    yield* Box({
      height: "100%",
      width: "100%",
      padding: 2,
      border: true,
      alignContent: "flex-start",
      flexWrap: "wrap",
    }, function* () {
      yield* Box({ border: true, width: "15%", height: "30%" });
      yield* Box({ border: true, width: "15%", height: "30%" });
      yield* Box({ border: true, width: "15%", height: "30%" });
      yield* Box({ border: true, width: "15%", height: "30%" });
      yield* Box({ border: true, width: "15%", height: "30%" });
    });
  });

  yield* suspend();
});
