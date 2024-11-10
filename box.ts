import { Operation } from "effection";
import { BorderDeclaration, compute } from "./border.ts";
import { createUINode, UIParentContext } from "./node.ts";
import { Edge, type Node } from "yoga-layout";

export interface BoxAttrs {
  height?: number | "auto" | `${number}%`;
  width?: number | "auto" | `${number}%`;
  flex?: number;
  padding?: number;
  border?: BorderDeclaration;
}

export function* Box(attrs: BoxAttrs, content?: () => Operation<void>) {
  let { border } = attrs;
  let node = yield* createUINode({
    paint: (area) => compute(border ?? false, area),
  });

  let { yoga } = node;

  applyFlexStyles(yoga, attrs);
  applyBorderStyles(yoga, border);

  if (content) {
    yield* UIParentContext.with(node, content);
  }
}

function applyFlexStyles(node: Node, attrs: BoxAttrs) {
  if (attrs.height != null) {
    node.setHeight(attrs.height);
  }
  if (attrs.width != null) {
    node.setWidth(attrs.width);
  }
  if (attrs.flex != null) {
    node.setFlex(attrs.flex);
  }
  if (attrs.padding) {
    node.setPadding(Edge.All, attrs.padding);
  }
}

function applyBorderStyles(node: Node, decl?: BorderDeclaration): void {
  if (decl == null) {
    return;
  }
  if (typeof decl === "boolean") {
    if (decl) {
      node.setBorder(Edge.All, 1);
    }
    return;
  }
  if (decl.top) {
    node.setBorder(Edge.Top, 1);
  }
  if (decl.left) {
    node.setBorder(Edge.Left, 1);
  }
  if (decl.bottom) {
    node.setBorder(Edge.Top, 1);
  }
  if (decl.right) {
    node.setBorder(Edge.Right, 1);
  }
}
