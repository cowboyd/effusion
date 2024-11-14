import { Box } from "../box.ts";
import { example } from "./example.ts";

await example(function* () {
  yield* Box({
    height: "100%",
    width: "100%",
    border: true,
    alignItems: "stretch",
  }, function* () {
    yield* Box({ margin: 2, height: 10, border: true, display: 'none' });
    yield* Box({ margin: 2, height: 10, border: true, display: 'flex' });
  });
});
