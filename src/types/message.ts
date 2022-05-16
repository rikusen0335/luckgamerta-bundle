import { Position } from ".";

export type onRunnerInfoChangeData = {
  runnerId: string | null,
  position: Position,
}

export type onDayChangeData = {
  day: "day1" | "day2"
}

export type MessageMap = {
  onRunnerInfoChange: {
    data: onRunnerInfoChangeData
    result: boolean
    error: string
  },
  onDayChange: {
    data: onDayChangeData
    result: boolean
    error: string
  }
};
