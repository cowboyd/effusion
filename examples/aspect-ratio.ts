import { Box } from "../box.ts";
import { example } from "./example.ts";

await example(function* () {
  yield* Box({
    height: "100%",
    width: "100%",
    border: true,
    padding: 1,
    alignItems: "flex-start",
  }, function* () {
    yield* Box({ height: 10, border: true, aspectRatio: 2 });
    yield* Box({ height: 10, border: true, aspectRatio: 4 });
  });
});
