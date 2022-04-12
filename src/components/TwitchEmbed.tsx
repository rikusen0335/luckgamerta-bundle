import React, { VFC } from "react"

type Props = {
  width: number;
  height: number;
  channelName: string;
  parent: string;
  muted?: boolean;
}

export const TwitchEmbed: VFC<Props> = ({ width, height, channelName, parent, muted = true }) => {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${channelName}&parent=${parent}&muted=${muted}`}
      height={height}
      width={width}
      frame-border="0"
      scrolling="no"
    />
  )
}
