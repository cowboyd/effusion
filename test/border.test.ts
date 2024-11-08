import { compute } from "../border.ts";
import { describe, expect, it } from "./suite.ts";

describe("borders", () => {
  describe("on boxes with no content", () => {
    it("can render a top on a box with no content", () => {
      expect(compute({ top: true }, { height: 1, width: 3 })).toMatchBox([
        "───",
      ]);
    });
    it("can render a bottom on a box with no content", () => {
      expect(compute({ bottom: true }, { height: 1, width: 3 })).toMatchBox([
        "───",
      ]);
    });
    it("renders nothing if there is no border specified", () => {
      expect(compute(false, { height: 1, width: 3 })).toMatchBox([
	'   ',
      ]);
    });
    it("can render a side on a box with no content", () => {
      expect(compute({ left: true }, { width: 1, height: 3 })).toMatchBox([
        "│",
        "│",
        "│",
      ]);
    });
    it("can render a side on a box with no content", () => {
      expect(compute({ right: true }, { width: 1, height: 3 })).toMatchBox([
        "│",
        "│",
        "│",
      ]);
    });
    it("can render a side on a box with no content", () => {
      expect(compute({}, { width: 1, height: 3 })).toMatchBox([
	' ',
	' ',
	' ',
      ]);
    });
    it("renders a full border", () => {
      expect(compute(true, { height: 2, width: 2 })).toMatchBox([
	"┌┐",
	"└┘",
      ]);
    });
  });


  it("can render a border on three sides", () => {
    expect(
      compute({ top: true, left: true, right: true }, { height: 2, width: 5 }),
    ).toMatchBox([
      "┌───┐",
      "│   │",
    ]);
  });
  
  it("renders a height of one border box with just a single line", () => {
    let box = [
      "│",
    ];
    expect(compute({ left: true }, { height: 1, width: 1 })).toMatchBox(box);
  });
  
  it("can render a full border a height of two ", () => {
    expect(compute(true, { height: 2, width: 4 })).toMatchBox([
      "┌──┐",
      "└──┘",
    ]);
  });
});
