export interface Offset {
  top: number;
  left: number;
}

export interface Area {
  height: number;
  width: number;
}

export interface Pixel {
  offset: Offset;
  char: string;
}

export interface Glyph {
  area: Area;
  pixels: Pixel[];
}
