import { Position } from "@/types";

export function positionToString(original: Position): string {
  switch (original) {
    case Position.LEFT_TOP:
      return "左上";
    case Position.RIGHT_TOP:
      return "右上"
    case Position.LEFT_BOTTOM:
      return "左上"
    case Position.RIGHT_BOTTOM:
      return "右下"
  }
}
