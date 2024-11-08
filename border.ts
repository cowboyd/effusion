import { pixel } from "./pixel.ts";
import { Pixel, Area, Glyph } from "./types.ts";

export const horizontal = "─";
export const vertical = "│";
export const cornerTopLeft = "┌";
export const cornerBottomLeft = "└";
export const cornerBottomRight = "┘";
export const cornerTopRight = "┐";

export type BorderDeclaration = boolean | BorderEdges;

export type BorderEdges = {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
};


export function compute(decl: BorderDeclaration, area: Area): Glyph {
  if (typeof decl === "boolean") {
    if (!decl) {
      return { area, pixels: []};
    } else {
      decl = { top: true, left: true, bottom: true, right: true }
    }

  }

  let { height, width } = area;

  if (height === 0 || width === 0) {
    return {
      area,
      pixels: [],
    };
  } else if (height === 1 && (decl.top || decl.bottom)) {
    return {
      area,
      pixels: Array(width).fill(null).map((_, i) => pixel(0, i, horizontal)),
    };
  } else if (width === 1 && (decl.left || decl.right)) {
    return {
      area,
      pixels: Array(height).fill(null).map((_, i) => pixel(i, 0, vertical)),
    };
  } else {
    return {
      area,
      pixels: sides(decl, area).concat(corners(decl, area)),
    };
  }
}

function corners(decl: BorderEdges, area: Area): Pixel[] {
  let corners: Pixel[] = [];
  //top left
  if (decl.top || decl.left) {
    if (decl.top && !decl.left) {
      corners.push(pixel(0,0, horizontal));
    } else if (!decl.top && decl.left) {
      corners.push(pixel(0,0, vertical));
    } else {
      corners.push(pixel(0,0, cornerTopLeft));
    }
  }
  //bottom left
  if (decl.left || decl.bottom) {
    if (decl.left && !decl.bottom) {
      corners.push(pixel(area.height - 1, 0, vertical));
    } else if (!decl.left && decl.bottom) {
      corners.push(pixel(area.height - 1, 0, horizontal));
    } else {
      corners.push(pixel(area.height - 1, 0, cornerBottomLeft));
    }
  }

  //bottom right
  if (decl.bottom || decl.right) {
    if (decl.bottom && !decl.right) {
      corners.push(pixel(area.height - 1, area.width - 1, horizontal));
    } else if (!decl.bottom && decl.right) {
      corners.push(pixel(area.height - 1, area.width - 1, vertical));
    } else {
      corners.push(pixel(area.height -1 , area.width - 1, cornerBottomRight));
    }
  }

  //top right
  if (decl.right || decl.top) {
    if (decl.right && !decl.top) {
      corners.push(pixel(0, area.width - 1, vertical));
    } else if (!decl.right && decl.top) {
      corners.push(pixel(0, area.width - 1, horizontal));
    } else {
      corners.push(pixel(0, area.width - 1, cornerTopRight));
    }
  }
  return corners;
}

function sides(decl: BorderEdges, area: Area): Pixel[] {
  let pixels = [];
  if (decl.top) {
    pixels.push(...Array(Math.max(area.width - 2, 0)).fill(null).map((_,i) => pixel(0, i + 1, horizontal)));
  }
  if (decl.bottom) {
    pixels.push(...Array(Math.max(area.width - 2, 0)).fill(null).map((_,i) => pixel(area.height - 1, i + 1, horizontal)));
  }
  if (decl.left) {
    pixels.push(...Array(Math.max(area.height - 2, 0)).fill(null).map((_,i) => pixel(i + 1, 0, vertical)));
  }
  if (decl.right) {
    pixels.push(...Array(Math.max(area.height - 2, 0)).fill(null).map((_,i) => pixel(i + 1, area.width, vertical)));
  }
  return pixels;
}

