import React, { VFC } from "react"

type Props = {
  width: number | string;
  height: number | string;
  channelName: string;
  parent: string;
  muted?: boolean;

  className?: string;
}

export const TwitchEmbed: VFC<Props> = ({ className, width, height, channelName, parent, muted = true }) => {
  return (
    <iframe
      className={className}
      src={`https://player.twitch.tv/?channel=${channelName}&parent=${parent}&muted=${muted}`}
      height={height}
      width={width}
      frame-border="0"
      scrolling="no"
    />
  )
}
