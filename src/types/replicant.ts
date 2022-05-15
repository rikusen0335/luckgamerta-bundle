import dayjs, { Dayjs } from "dayjs";

export interface Score {
  point: 0 | 1 | 2 | 3 | 4;
  game: number;
}

export interface Stream {
  runnerId: string;
  runnerName: string;
  twitchName: string;
  startTimeInString: string;
  remainingSeconds: number;
  gameName: string;
  categoryName: string;
  commentatorName: string;
}

export interface ReplicantMap {
  names: [string, string];
  scores: [Score, Score];
  currentStreams: [Stream | null, Stream | null, Stream | null, Stream | null];
  allStreams: Stream[];
  generalCommentatorName: string;
  timePassed: number;
}

export const replicantDefaultValues: ReplicantMap = {
  names: ['プレイヤーA', 'プレイヤーB'],
  scores: [
    { point: 0, game: 0 },
    { point: 0, game: 0 }
  ],
  currentStreams: [null, null, null, null],
  allStreams: [],
  generalCommentatorName: "",
  timePassed: 0,
};
