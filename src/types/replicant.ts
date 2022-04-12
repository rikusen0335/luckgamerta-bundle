export interface Score {
  point: 0 | 1 | 2 | 3 | 4;
  game: number;
}

export interface Player {
  playerName: string;
  twitchName: string;
  remainingSeconds: number;
  commentatorName: string;
  gameName: string;
  category: string;
}

export interface ReplicantMap {
  names: [string, string];
  scores: [Score, Score];
  players: Player[];
  generalCommentatorName: string;
}

export const replicantDefaultValues: ReplicantMap = {
  names: ['プレイヤーA', 'プレイヤーB'],
  scores: [
    { point: 0, game: 0 },
    { point: 0, game: 0 }
  ],
  players: [],
  generalCommentatorName: "",
};
