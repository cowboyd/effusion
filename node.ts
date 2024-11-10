import type { Node } from "yoga-layout";
import Yoga from "yoga-layout";
import {
  createContext,
  type Operation,
  race,
  resource,
  sleep,
  withResolvers,
} from "effection";
import type { Area, Glyph, Offset } from "./types.ts";

export interface UINode {
  yoga: Node;
  offset: Offset;
  remove(): Operation<void>;
  content: Set<UINode>;
  paint(area: Area): Glyph;
}

export const UIParentContext = createContext<UINode>(`ui.parent`);

export function useUIParent() {
  return UIParentContext.expect();
}

interface CreateUINodeOptions {
  yoga?: Node;
  paint?(area: Area): Glyph;
}

export function createUINode(options: CreateUINodeOptions): Operation<UINode> {
  return resource(function* (provide) {
    let { yoga = Yoga.Node.create() } = options;
    let parent = yield* UIParentContext.get();

    let content: Set<UINode> = new Set();

    let { operation: removed, resolve } = withResolvers<void>();

    function* remove() {
      resolve();
      yield* sleep(0); //TODO: why?
    }

    let paint = options.paint ?? ((area: Area) => ({ area, pixels: [] }));

    let node = {
      yoga,
      content,
      remove,
      paint,
      get offset() {
        let { top, left } = yoga.getComputedLayout();
        for (
          let current = yoga.getParent();
          current;
          current = current.getParent()
        ) {
          top += current.getComputedTop();
          left += current.getComputedLeft();
        }
        return { top, left };
      },
    };

    if (parent) {
      parent.yoga.insertChild(yoga, parent.yoga.getChildCount());
      parent.content.add(node);
    }

    try {
      yield* race([removed, provide(node)]);
    } finally {
      if (parent) {
        parent.yoga.removeChild(yoga);
        parent.content.delete(node);
      }
      yoga.free();
      for (let child of content) {
        yield* child.remove();
      }
    }
  });
}
