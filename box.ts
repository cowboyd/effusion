import { Operation } from "effection";
import { BorderDeclaration, compute } from "./border.ts";
import { createUINode, UIParentContext } from "./node.ts";
import { Align, Edge, type Node, Wrap } from "yoga-layout";

export interface BoxAttrs {
  height?: number | "auto" | `${number}%`;
  width?: number | "auto" | `${number}%`;
  flex?: number;
  padding?: number;
  alignContent?:
    | "auto"
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "baseline"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flexWrap?: "wrap" | "no-wrap" | "wrap-reverse";
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
  if (attrs.alignContent) {
    let value = attrs.alignContent;
    if (value === "auto") {
      node.setAlignContent(Align.Auto);
    } else if (value === "flex-start") {
      node.setAlignContent(Align.FlexStart);
    } else if (value === "center") {
      node.setAlignContent(Align.Center);
    } else if (value === "flex-end") {
      node.setAlignContent(Align.FlexEnd);
    } else if (value === "stretch") {
      node.setAlignContent(Align.Stretch);
    } else if (value === "baseline") {
      node.setAlignContent(Align.Baseline);
    } else if (value === "space-between") {
      node.setAlignContent(Align.SpaceBetween);
    } else if (value === "space-around") {
      node.setAlignContent(Align.SpaceAround);
    } else if (value === "space-evenly") {
      node.setAlignContent(Align.SpaceEvenly);
    }
  }
  if (attrs.flexWrap) {
    let value = attrs.flexWrap;
    if (value === "wrap") {
      node.setFlexWrap(Wrap.Wrap);
    } else if (value === "no-wrap") {
      node.setFlexWrap(Wrap.NoWrap);
    } else if (value === "wrap-reverse") {
      node.setFlexWrap(Wrap.WrapReverse);
    }
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
