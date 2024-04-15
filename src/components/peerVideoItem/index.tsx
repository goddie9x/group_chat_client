import React, { useEffect, useRef } from 'react';
import { TVideoCallItemProps } from '../videoCallItem/videoItem.styled';
import { PEER_CHANNEL } from 'constants/socketChanel';
import Peer from 'simple-peer';
import TVideoCallItem from 'components/videoCallItem';

export type RemotePeer = {
  peer: Peer.Instance;
  userId?: string;
  socketId: string;
};

export type TPeerVideoProps = Omit<TVideoCallItemProps, 'ref'> & {
  peer?: Peer.Instance;
};

const TPeerVideo = ({ peer, ...props }: TPeerVideoProps) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    peer?.on(PEER_CHANNEL.STREAM, (stream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
        console.log(props.title,stream);
      }
    });
  }, [peer]);

  return <TVideoCallItem {...props} playsInline autoPlay ref={ref} />;
};

export default TPeerVideo;
