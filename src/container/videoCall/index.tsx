import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import TPeerVideo from 'components/peerVideoItem';
import TVideoCallItem from 'components/videoCallItem';
import TGrid from 'components/grid';

import { CHAT_CHANNELS, PEER_CHANNEL } from 'constants/socketChanel';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type RoomProps = {
  roomId: string;
  ownerId: string;
};

const socket = io(process.env.REACT_APP_API_URL + '');

const TVideoCall = ({ roomId }: RoomProps) => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<{ peerID: string; peer: Peer.Instance }[]>([]);
  const [displayVideoPerRow, setDisplayVideoPerRow] = useState(2);
  const currentUser = useSelector((state: RootState) => state.auth.userData);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);

  const calculateVideosPerRow = (peerCount: number) => {
    let amountItem = 1;
    if (peerCount === 1) amountItem = 1;
    else if (peerCount >= 2 && peerCount <= 4) amountItem = 2;
    else if (peerCount >= 5 && peerCount <= 6) amountItem = 3;
    else amountItem = 4;
    setDisplayVideoPerRow(12 / amountItem);
  };

  const createPeer = (userToSignal: string, callerID?: string, stream?: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on(PEER_CHANNEL.SIGNAL, (signal) => {
      socket.emit(CHAT_CHANNELS.SENDING_SIGNAL, { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal: Peer.SignalData, callerID: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on(PEER_CHANNEL.SIGNAL, (signal) => {
      socket.emit(CHAT_CHANNELS.RETURNING_SIGNAL, { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  useEffect(() => {
    let mediaStream:MediaStream|null = null;
    if (openVideo || openMic) {
      navigator.mediaDevices.getUserMedia({ video: openVideo, audio: openMic }).then((stream) => {
        mediaStream = stream;
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        socket.emit(CHAT_CHANNELS.USER_VIDEO_CONNECTED, {
          roomId,
          userId: currentUser?._id,
        });
        socket.on(CHAT_CHANNELS.VIDEO_JOIN_CHAT_ROOM({ roomId }), (users) => {
          const newPeers: Peer.Instance[] = [];
          users.forEach((userID: string) => {
            const peer = createPeer(userID, socket.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            newPeers.push(peer);
          });
          setPeers(newPeers);
          calculateVideosPerRow(newPeers.length);
        });

        socket.on(CHAT_CHANNELS.USER_RECEIVED_SIGNAL, (payload) => {
          const itemIndex = peersRef.current.findIndex((p) => p.peerID === payload.callerID);
          if (itemIndex < 0) {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((prevPeers) => [...prevPeers, peer]);
          }
        });

        socket.on(CHAT_CHANNELS.USER_RECEIVED_RETURN_SIGNAL, (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          if (item) {
            item.peer.signal(payload.signal);
          }
        });
      });
    }
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      socket.off(CHAT_CHANNELS.VIDEO_JOIN_CHAT_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.USER_RECEIVED_SIGNAL);
      socket.off(CHAT_CHANNELS.USER_RECEIVED_RETURN_SIGNAL);
      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
    };
  }, [roomId, openVideo, openMic]);

  return (
    <TGrid container spacing={1}>
      <TGrid item xs={displayVideoPerRow}>
        <TVideoCallItem
          canToggleMedia
          isTurnOnCamera={openVideo}
          isTurnOnMicrophone={openMic}
          ref={userVideo}
          onToggleCamera={(prevState) => {
            setOpenVideo(!prevState);
          }}
          onToggleMicrophone={(prevState) => setOpenMic(!prevState)}
        />
      </TGrid>
      {peers.map((peer, index) => (
        <TGrid item key={index} xs={displayVideoPerRow}>
          <TPeerVideo peer={peer} />
        </TGrid>
      ))}
    </TGrid>
  );
};

export default TVideoCall;
