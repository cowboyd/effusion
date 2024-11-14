import { createSignal, resource, Stream } from "effection";
import { Area } from "./types.ts";

export const resizes: Stream<Area, never> = resource(function* (provide) {
  let signal = createSignal<Area, never>();
  const subscription = yield* signal;
  let send = () => {
    let size = Deno.consoleSize();
    signal.send({ height: size.rows, width: size.columns});
  };

  try {
    Deno.addSignalListener("SIGWINCH", send);
    yield* provide(subscription);
  } finally {
    Deno.removeSignalListener("SIGWINCH", send);
  }
});
