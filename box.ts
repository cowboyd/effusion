import { Operation } from "effection";
import { BorderDeclaration, compute } from "./border.ts";
import { createUINode, UIParentContext } from "./node.ts";
import { Align as YAlign, Edge, type Node, Wrap, Display } from "yoga-layout";

export type Align =
  | "auto"
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline"
  | "space-between"
  | "space-around"
  | "space-evenly";

export interface BoxAttrs {
  height?: number | "auto" | `${number}%`;
  width?: number | "auto" | `${number}%`;
  flex?: number;
  margin?: number | "auto" | `${number}%` | {
    top?: number | "auto" | `${number}%`;
    left?: number | "auto" | `${number}%`;
    bottom?: number | "auto" | `${number}%`;
    right?: number | "auto" | `${number}%`;
  };
  padding?: number | `${number}%` | {
    top?: number | `${number}%`;
    left?: number | `${number}%`;
    bottom?: number | `${number}%`;
    right?: number | `${number}%`;
  };
  alignContent?: Align;
  alignSelf?: Align;
  alignItems?: Align;
  flexWrap?: "wrap" | "no-wrap" | "wrap-reverse";
  border?: BorderDeclaration;
  aspectRatio?: number;
  display?: "flex" | "none";
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
  if (attrs.margin) {
    let value = attrs.margin;
    if (typeof value === "number" || typeof value === "string") {
      node.setMargin(Edge.All, value);
    } else {
      if (value.top) {
        node.setMargin(Edge.Top, value.top);
      }
      if (value.left) {
        node.setMargin(Edge.Left, value.left);
      }
      if (value.bottom) {
        node.setMargin(Edge.Bottom, value.bottom);
      }
      if (value.right) {
        node.setMargin(Edge.Right, value.right);
      }
    }
  }
  if (attrs.padding) {
    let value = attrs.padding;
    if (typeof value === "number" || typeof value === "string") {
      node.setPadding(Edge.All, value);
    } else {
      if (value.top) {
        node.setPadding(Edge.Top, value.top);
      }
      if (value.left) {
        node.setPadding(Edge.Left, value.left);
      }
      if (value.bottom) {
        node.setPadding(Edge.Bottom, value.bottom);
      }
      if (value.right) {
        node.setPadding(Edge.Right, value.right);
      }
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

  if (attrs.alignItems) {
    let value = attrs.alignItems;
    if (value === "auto") {
      node.setAlignItems(YAlign.Auto);
    } else if (value === "flex-start") {
      node.setAlignItems(YAlign.FlexStart);
    } else if (value === "center") {
      node.setAlignItems(YAlign.Center);
    } else if (value === "flex-end") {
      node.setAlignItems(YAlign.FlexEnd);
    } else if (value === "stretch") {
      node.setAlignItems(YAlign.Stretch);
    } else if (value === "baseline") {
      node.setAlignItems(YAlign.Baseline);
    } else if (value === "space-between") {
      node.setAlignItems(YAlign.SpaceBetween);
    } else if (value === "space-around") {
      node.setAlignItems(YAlign.SpaceAround);
    } else if (value === "space-evenly") {
      node.setAlignItems(YAlign.SpaceEvenly);
    }    
  }
  
  if (attrs.alignContent) {
    let value = attrs.alignContent;
    if (value === "auto") {
      node.setAlignContent(YAlign.Auto);
    } else if (value === "flex-start") {
      node.setAlignContent(YAlign.FlexStart);
    } else if (value === "center") {
      node.setAlignContent(YAlign.Center);
    } else if (value === "flex-end") {
      node.setAlignContent(YAlign.FlexEnd);
    } else if (value === "stretch") {
      node.setAlignContent(YAlign.Stretch);
    } else if (value === "baseline") {
      node.setAlignContent(YAlign.Baseline);
    } else if (value === "space-between") {
      node.setAlignContent(YAlign.SpaceBetween);
    } else if (value === "space-around") {
      node.setAlignContent(YAlign.SpaceAround);
    } else if (value === "space-evenly") {
      node.setAlignContent(YAlign.SpaceEvenly);
    }
  }

  if (attrs.alignSelf) {
    let value = attrs.alignSelf;
    if (value === "auto") {
      node.setAlignSelf(YAlign.Auto);
    } else if (value === "flex-start") {
      node.setAlignSelf(YAlign.FlexStart);
    } else if (value === "center") {
      node.setAlignSelf(YAlign.Center);
    } else if (value === "flex-end") {
      node.setAlignSelf(YAlign.FlexEnd);
    } else if (value === "stretch") {
      node.setAlignSelf(YAlign.Stretch);
    } else if (value === "baseline") {
      node.setAlignSelf(YAlign.Baseline);
    } else if (value === "space-between") {
      node.setAlignSelf(YAlign.SpaceBetween);
    } else if (value === "space-around") {
      node.setAlignSelf(YAlign.SpaceAround);
    } else if (value === "space-evenly") {
      node.setAlignSelf(YAlign.SpaceEvenly);
    }
  }
  if (typeof attrs.aspectRatio !== "undefined") {
    node.setAspectRatio(attrs.aspectRatio);
  }
  if (attrs.display) {
    if (attrs.display === "flex") {
      node.setDisplay(Display.Flex)      
    }
    if (attrs.display === "none") {
      node.setDisplay(Display.None);
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
