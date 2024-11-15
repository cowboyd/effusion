import { Box } from "../box.ts";
import { example } from "./example.ts";

await example(function* () {
  yield* Box({
    height: "100%",
    width: "100%",
    border: true,
    justifyContent: "center",
    alignItems: "center",
  }, function* () {
    yield* Box({ border: true, margin: 2, flexBasis: 5, aspectRatio: 2 });
    yield* Box({ border: true, margin: 2, flexBasis: 5, aspectRatio: 2 });
  });
});
