import type { Node } from "yoga-layout"
import Yoga from "yoga-layout";
import { createContext, race, resource, sleep, withResolvers, type Operation } from "effection";

interface UINode {
  yoga: Node;
  remove(): Operation<void>;
  content: Set<UINode>;
}

export const UIParentContext = createContext<UINode>(`ui.parent`);

interface CreateUINodeOptions {
  yoga?: Node;
}

export function createUINode(options: CreateUINodeOptions): Operation<UINode> {  
  return resource(function*(provide) {
    let { yoga = Yoga.Node.create() } = options;
    let parent = yield* UIParentContext.get();

    let content: Set<UINode> = new Set();
    
    let { operation: removed, resolve } = withResolvers<void>();

    function* remove() {
      resolve();
      yield* sleep(0); //TODO: why?
    }
   
    let node = { yoga, content, remove};
        
    if (parent) {
      parent.yoga.insertChild(yoga, parent.yoga.getChildCount());
      parent.content.add(node)
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
  })
}
