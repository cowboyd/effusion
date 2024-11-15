import { Box } from "../box.ts";
import { example } from "./example.ts";

await example(function* () {
  yield* Box({
    height: "100%",
    width: "100%",
    padding: 2,
    border: true,
    alignContent: "flex-start",
    flexWrap: "wrap",
    columnGap: 2,
    rowGap: 2,
  }, function* () {
    yield* Box({ border: true, width: "15%", height: "30%" });
    yield* Box({ border: true, width: "15%", height: "30%" });
    yield* Box({ border: true, width: "15%", height: "30%" });
    yield* Box({ border: true, width: "15%", height: "30%" });
    yield* Box({ border: true, width: "15%", height: "30%" });
  });
});
