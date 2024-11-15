import { Box } from "../box.ts";
import { example } from "./example.ts";

await example(function* () {
  yield* Box({
    height: "100%",
    width: "100%",
    border: true,
    flexDirection: "row-reverse",
  }, function* () {
    yield* Box({ margin: 2, flexGrow: 0.25, border: true });
    yield* Box({ margin: 2, flexGrow: 0.75, border: true });
  });
});
