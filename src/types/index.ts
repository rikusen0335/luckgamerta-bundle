export const Position = {
  LEFT_TOP: 0,
  RIGHT_TOP: 1,
  LEFT_BOTTOM: 2,
  RIGHT_BOTTOM: 3,
} as const;

export type Position = typeof Position[keyof typeof Position]

export * from "./message"
export * from "./replicant"
