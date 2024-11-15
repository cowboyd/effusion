import { Box } from "../box.ts";
import { example } from "./example.ts";

await example(function* () {
  yield* Box({
    height: "100%",
    width: "100%",
    border: true,
    alignContent: "flex-start",
  }, function* () {
    yield* Box({
      border: true,
      flexBasis: 10,
      aspectRatio: 2,
      top: 5,
      left: 10,
    });
  });
});
