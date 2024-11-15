import { Operation } from "effection";
import { BorderDeclaration, compute } from "./border.ts";
import { createUINode, UIParentContext } from "./node.ts";
import {
  Align as YAlign,
  Display,
  Edge,
  FlexDirection,
  Gutter,
  Justify as YJustify,
  type Node,
  Wrap,
  PositionType,
} from "yoga-layout";

export type Justify =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly";

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
  flexBasis?: number | "auto" | `${number}%`;
  flexGrow?: number;
  flexShrink?: number;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "wrap" | "no-wrap" | "wrap-reverse";
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
  top?: number | `${number}%`;
  left?: number | `${number}%`;
  bottom?: number | `${number}%`;
  right?: number | `${number}%`;
  position?: "absolute" | "relative" | "static";
  alignContent?: Align;
  alignSelf?: Align;
  alignItems?: Align;
  justifyContent?: Justify;
  border?: BorderDeclaration;
  aspectRatio?: number;
  display?: "flex" | "none";
  gap?: number | `${number}%`;
  rowGap?: number | `${number}%`;
  columnGap?: number | `${number}%`;
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

  if (attrs.flexBasis) {
    node.setFlexBasis(attrs.flexBasis);
  }

  if (attrs.flexGrow) {
    node.setFlexGrow(attrs.flexGrow);
  }

  if (attrs.flexShrink) {
    node.setFlexShrink(attrs.flexShrink);
  }

  if (attrs.flexDirection) {
    let value = attrs.flexDirection;
    if (value === "row") {
      node.setFlexDirection(FlexDirection.Row);
    } else if (value === "column") {
      node.setFlexDirection(FlexDirection.Column);
    } else if (value === "row-reverse") {
      node.setFlexDirection(FlexDirection.RowReverse);
    } else if (value === "column-reverse") {
      node.setFlexDirection(FlexDirection.ColumnReverse);
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

  if (attrs.justifyContent) {
    let value = attrs.justifyContent;
    if (value === "flex-start") {
      node.setJustifyContent(YJustify.FlexStart);
    } else if (value === "flex-end") {
      node.setJustifyContent(YJustify.FlexEnd);
    } else if (value === "center") {
      node.setJustifyContent(YJustify.Center);
    } else if (value === "space-around") {
      node.setJustifyContent(YJustify.SpaceAround);
    } else if (value === "space-between") {
      node.setJustifyContent(YJustify.SpaceBetween);
    } else if (value === "space-evenly") {
      node.setJustifyContent(YJustify.SpaceEvenly);
    }
  }

  if (typeof attrs.aspectRatio !== "undefined") {
    node.setAspectRatio(attrs.aspectRatio);
  }
  if (attrs.display) {
    if (attrs.display === "flex") {
      node.setDisplay(Display.Flex);
    }
    if (attrs.display === "none") {
      node.setDisplay(Display.None);
    }
  }
  if (attrs.gap) {
    node.setGap(Gutter.All, attrs.gap);
  }
  if (attrs.rowGap) {
    node.setGap(Gutter.Row, attrs.rowGap);
  }
  if (attrs.columnGap) {
    node.setGap(Gutter.Column, attrs.rowGap);
  }
  if (attrs.top) {
    node.setPosition(Edge.Top, attrs.top);
  }
  if (attrs.left) {
    node.setPosition(Edge.Left, attrs.left);
  }
  if (attrs.bottom) {
    node.setPosition(Edge.Bottom, attrs.bottom);
  }
  if (attrs.right) {
    node.setPosition(Edge.Top, attrs.right);
  }
  if (attrs.position) {
    let value = attrs.position;
    if (value === "absolute") {
      node.setPositionType(PositionType.Absolute);
    } else if (value === "relative") {
      node.setPositionType(PositionType.Relative);
    } else if (value === "static") {
      node.setPositionType(PositionType.Static);
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
