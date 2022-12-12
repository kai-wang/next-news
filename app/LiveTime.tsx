'use client';

import TimeAgo from "react-timeago";

type Props = {
    time: string
}

function LiveTime({ time }: Props) {
  return <TimeAgo date={time} />;
}

export default LiveTime