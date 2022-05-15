import { Position } from ".";

export type MessageMap = {
  onRunnerInfoChange: {
    data: { runnerId: string | null, position: Position };
    result: boolean
    error: string
  }
};
