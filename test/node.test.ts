import { run } from "effection";
import { describe, expect, it } from "./suite.ts";
import { createUINode, UIParentContext } from "../node.ts";

describe("nodes", () => {
  it("can be created outside the context of a parent", async () => {
    await run(function* () {
      return yield* createUINode({});
    });
  });
  it("adds itself to the current parent when created", async () => {
    await run(function* () {
      let parent = yield* createUINode({});
      let child = yield* UIParentContext.with(parent, () => createUINode({}));
      expect(parent.content.has(child)).toEqual(true);
      expect(parent.yoga.getChildCount()).toEqual(1);
    });
  });
  it("removes itself from the parent when it is released", async () => {
    await run(function* () {
      let parent = yield* createUINode({});
      let child = yield* UIParentContext.with(parent, () => createUINode({}));

      yield* child.remove();

      expect(parent.content.has(child)).toEqual(false);
      expect(parent.yoga.getChildCount()).toEqual(0);
    });
  });
  it("frees all its children when it is removed", async () => {
    await run(function* () {
      let parent = yield* createUINode({});
      let child = yield* UIParentContext.with(parent, function* () {
        let child = yield* createUINode({});
        yield* UIParentContext.with(child, () => createUINode({}));
        return child;
      });

      expect(child.content.size).toEqual(1);

      yield* parent.remove();

      expect(child.content.size).toEqual(0);
    });
  });
});
