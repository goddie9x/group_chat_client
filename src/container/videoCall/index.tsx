import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import TPeerVideo from 'components/peerVideoItem';
import TVideoCallItem from 'components/videoCallItem';
import { TRoomsProps } from 'pages/chat';
import TGrid from 'components/grid';

import { CHAT_CHANNELS, PEER_CHANNEL } from 'constants/socketChanel';
import { UserDataSchema } from 'store/slices/auth';

const socket = io(process.env.REACT_APP_API_URL + '');

type TVideoCallProps = TRoomsProps & { currentUser: UserDataSchema };
type PeerProps = {
  user: UserDataSchema;
  peer: Peer.Instance | undefined;
};

const TVideoCall = ({ _id: roomId, creator, users, currentUser }: TVideoCallProps) => {
  const [peers, setPeers] = useState<PeerProps[]>([]);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);

  const streamRef = useRef<MediaStream | undefined>();
  const userVideo = useRef<HTMLVideoElement>(null);
  const listPeerToSendStreamRef = useRef<PeerProps[]>([]);

  const calculateVideosPerRow = (peerCount: number) => {
    let amountItem = 1;
    if (peerCount === 1) amountItem = 1;
    else if (peerCount >= 2 && peerCount <= 4) amountItem = 2;
    else if (peerCount >= 5 && peerCount <= 6) amountItem = 3;
    else amountItem = 4;
    return 12 / amountItem;
  };
  const createPeerToStream = (user: UserDataSchema, stream: MediaStream | undefined) => {
    const peer = new Peer({
      initiator: true,
      stream,
      iceCompleteTimeout: 10000,
      trickle: false,
    });
    peer.on(PEER_CHANNEL.SIGNAL, (signal) => {
      socket.emit(CHAT_CHANNELS.SENDING_SIGNAL, {
        userRequireAnswerSignal: user,
        roomId,
        userSendSignal: currentUser,
        signal,
      });
    });
    return peer;
  };
  const addPeerToReceiveStream = (user: UserDataSchema, signal: Peer.SignalData, stream: MediaStream | undefined) => {
    const peer = new Peer({
      initiator: false,
      stream,
      iceCompleteTimeout: 10000,
      trickle: false,
    });

    peer.on(PEER_CHANNEL.SIGNAL, (signal) => {
      socket.emit(CHAT_CHANNELS.RETURNING_SIGNAL, {
        roomId,
        signal,
        userReturnSignal: currentUser,
        userReceiveReturnSignal: user,
      });
    });
    peer.signal(signal);
    return peer;
  };
  useEffect(() => {
    const getMedia = async () => {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: openVideo, audio: openMic });
        if (userVideo.current) {
          userVideo.current.srcObject = streamRef.current;
        }
        listPeerToSendStreamRef.current.forEach((p) => (p.peer = createPeerToStream(p.user, streamRef.current)));
      } catch (e) {}
    };
    getMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [openVideo, openMic]);

  useEffect(() => {
    socket.emit(CHAT_CHANNELS.USER_CONNECTED, {
      roomId,
      user: currentUser,
    });
    socket.on(CHAT_CHANNELS.JOIN_CHAT_ROOM({ roomId }), (user) => {
      if (user._id != currentUser._id) {
        const newPeers: PeerProps[] = [];

        if (users.findIndex((u) => u._id == user._id) < 0) {
          users.push(user);
        }
        console.log(users);
        listPeerToSendStreamRef.current = [];
        users.forEach((user) => {
          if (currentUser._id != user._id) {
            newPeers.push({
              user,
              peer: undefined,
            });
            listPeerToSendStreamRef.current.push({
              user,
              peer: createPeerToStream(user, streamRef.current),
            });
          }
        });
        setPeers(newPeers);
      }
    });
    socket.on(
      CHAT_CHANNELS.USER_RECEIVED_SIGNAL_IN_ROOM({ roomId }),
      ({ userRequireAnswerSignal, signal, userSendSignal }) => {
        if (currentUser._id == userRequireAnswerSignal._id) {
          try {
            const existPeerIndex = peers.findIndex((p) => p.user._id == userSendSignal._id);
            const newPeer = addPeerToReceiveStream(userSendSignal, signal, streamRef.current);

            if (existPeerIndex < 0) {
              setPeers((prev) => [
                ...prev,
                {
                  user: userSendSignal,
                  peer: newPeer,
                },
              ]);
            } else {
              setPeers((prev) => {
                const newPeers = [...prev];
                newPeers[existPeerIndex].peer = newPeer;
                return newPeers;
              });
            }
          } catch (e) {}
        }
      },
    );
    socket.on(
      CHAT_CHANNELS.USER_RECEIVED_RETURN_SIGNAL({ roomId }),
      ({ signal, userReturnSignal, userReceiveReturnSignal }) => {
        if (currentUser._id == userReceiveReturnSignal._id) {
          try {
            listPeerToSendStreamRef.current.find((p) => p.user._id == userReturnSignal._id)?.peer?.signal(signal);
          } catch (e) {}
        }
      },
    );
    return () => {
      socket.off(CHAT_CHANNELS.JOIN_CHAT_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.USER_RECEIVED_SIGNAL_IN_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.USER_RECEIVED_RETURN_SIGNAL({ roomId }));
    };
  }, []);
  return (
    <TGrid container spacing={1}>
      <TGrid item xs={calculateVideosPerRow(peers.length + 1)}>
        <TVideoCallItem
          title={currentUser.fullName ?? currentUser.account}
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
        <TGrid item key={index} xs={calculateVideosPerRow(peers.length + 1)}>
          <TPeerVideo
            title={peer.user.fullName ?? peer.user.account}
            canToggleMedia={currentUser._id == creator._id}
            peer={peer.peer}
          />
        </TGrid>
      ))}
    </TGrid>
  );
};

export default TVideoCall;
