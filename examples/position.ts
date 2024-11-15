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
    yield* Box({ border: true, top: 1, left: 5, height: 5, aspectRatio: 2, position: 'absolute' });    
  });
});
