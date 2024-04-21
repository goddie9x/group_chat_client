import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import TPeerVideo from 'components/peerVideoItem';
import TVideoCallItem from 'components/videoCallItem';
import { TRoomsProps } from 'pages/chat';
import TGrid from 'components/grid';

import { CHAT_CHANNELS, PEER_CHANNEL } from 'constants/socketChanel';
import { UserDataSchema } from 'store/slices/auth';
import SimplePeer from 'simple-peer';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const socket = io(process.env.REACT_APP_API_URL + '');

type HandleUserReceiveSignalProps = {
  userRequireAnswerSignal: UserDataSchema;
  signal: Peer.SignalData;
  userSendSignal: UserDataSchema;
};

type PeerProps = {
  user: UserDataSchema;
  peer: Peer.Instance | undefined;
};

const TVideoCall = ({ _id: roomId, creator, users }: TRoomsProps) => {
  const [peers, setPeers] = useState<PeerProps[]>([]);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);

  const userVideo = useRef<HTMLVideoElement>(null);
  const listPeerToSendStreamRef = useRef<PeerProps[]>([]);
  const listUserRef = useRef<UserDataSchema[]>(users);
  const streamRef = useRef<MediaStream | undefined>();
  const currentUser = useSelector((state: RootState) => state.auth.userData);

  const calculateVideosPerRow = (peerCount: number) => {
    let amountItem = 1;
    if (peerCount === 1) amountItem = 1;
    else if (peerCount >= 2 && peerCount <= 4) amountItem = 2;
    else if (peerCount >= 5 && peerCount <= 6) amountItem = 3;
    else amountItem = 4;
    return 12 / amountItem;
  };
  const createPeerToStream = (user: UserDataSchema, stream: MediaStream | undefined) => {
    const currentPeerToSendStreamIndex = listPeerToSendStreamRef.current.findIndex((p) => p.user._id == user._id);
    if (currentPeerToSendStreamIndex > -1) {
      listPeerToSendStreamRef.current.splice(currentPeerToSendStreamIndex, 1);
    }
    const peer = new SimplePeer({
      initiator: true,
      iceCompleteTimeout: 10000,
      trickle: false,
      offerOptions: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
      stream,
      config: {
        iceServers: [
          { urls: process.env.REACT_APP_TURN_SERVER! },
          {
            urls: process.env.REACT_APP_TURN_SERVER!,
            username: process.env.REACT_APP_TURN_USERNAME,
            credential: process.env.REACT_APP_TURN_PASSWORD,
          },
        ],
      },
    });
    peer.on(PEER_CHANNEL.ERROR, (e) => {
      console.log(e);
    });
    peer.on(PEER_CHANNEL.SIGNAL, (signal) => {
      socket.emit(CHAT_CHANNELS.SENDING_SIGNAL, {
        userRequireAnswerSignal: user,
        roomId,
        userSendSignal: currentUser,
        signal,
      });
    });
    listPeerToSendStreamRef.current.push({
      user,
      peer,
    });
  };
  const addPeerToReceiveStream = (user: UserDataSchema) => {
    const peer = new Peer({
      initiator: false,
      iceCompleteTimeout: 10000,
      trickle: false,
      answerOptions: {
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      },
      config: {
        iceServers: [
          {
            urls: process.env.REACT_APP_TURN_DEFAULT_SERVER!,
            username: process.env.REACT_APP_TURN_USERNAME,
            credential: process.env.REACT_APP_TURN_PASSWORD,
          },
          {
            urls: process.env.REACT_APP_TURN_TCP_SERVER!,
            username: process.env.REACT_APP_TURN_USERNAME,
            credential: process.env.REACT_APP_TURN_PASSWORD,
          },
          {
            urls: process.env.REACT_APP_TURN_TCP2_SERVER!,
            username: process.env.REACT_APP_TURN_USERNAME,
            credential: process.env.REACT_APP_TURN_PASSWORD,
          },
          {
            urls: process.env.REACT_APP_TURN_TCP_GLOBAL_SERVER!,
            username: process.env.REACT_APP_TURN_USERNAME,
            credential: process.env.REACT_APP_TURN_PASSWORD,
          },
        ],
      },
    });
    peer.on(PEER_CHANNEL.ERROR, (e) => {
      console.log(e);
    });
    peer.on(PEER_CHANNEL.SIGNAL, (signal) => {
      socket.emit(CHAT_CHANNELS.RETURNING_SIGNAL, {
        roomId,
        signal,
        userReturnSignal: currentUser,
        userReceiveReturnSignal: user,
      });
    });
    setPeers((prev) => {
      const newPeers = [...prev];
      const currentPeerToReceiveStreamIndex = newPeers.findIndex((p) => p.user._id == user._id);

      if (currentPeerToReceiveStreamIndex > -1) {
        newPeers.splice(currentPeerToReceiveStreamIndex, 1);
      }
      newPeers.push({
        user,
        peer,
      });
      return newPeers;
    });
    return peer;
  };

  const handleUserReceiveSignal = async ({
    userRequireAnswerSignal,
    signal,
    userSendSignal,
  }: HandleUserReceiveSignalProps) => {
    const newPeer = addPeerToReceiveStream(userSendSignal);
    try {
      newPeer.signal(signal);
    } catch (e) {}
  };

  const initPeers = () => {
    listUserRef.current.forEach((user) => {
      if (currentUser?._id != user._id) {
        addPeerToReceiveStream(user);
        createPeerToStream(user, streamRef.current);
      }
    });
  };
  useEffect(() => {
    if (currentUser) {
      const getMedia = async () => {
        try {
          streamRef.current = await navigator.mediaDevices.getUserMedia({ video: openVideo, audio: openMic });
          if (userVideo.current) {
            userVideo.current.srcObject = streamRef.current;
          }
          listPeerToSendStreamRef.current.forEach((p) => createPeerToStream(p.user, streamRef.current));
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
    }
  }, [openVideo, openMic, currentUser]);

  useEffect(() => {
    if (currentUser) {
      initPeers();
      socket.emit(CHAT_CHANNELS.USER_CONNECTED, {
        roomId,
        user: currentUser,
      });
      socket.on(CHAT_CHANNELS.JOIN_CHAT_ROOM({ roomId }), (user) => {
        if (user._id != currentUser._id) {
          if (listUserRef.current.findIndex((u) => u._id == user._id) < 0) {
            listUserRef.current.push(user);
          }
          addPeerToReceiveStream(user);
          createPeerToStream(user, streamRef.current);
        }
      });
      socket.on(
        CHAT_CHANNELS.USER_RECEIVED_SIGNAL_IN_ROOM({ roomId }),
        ({ userRequireAnswerSignal, signal, userSendSignal }) => {
          if (currentUser._id == userRequireAnswerSignal._id) {
            handleUserReceiveSignal({ userRequireAnswerSignal, signal, userSendSignal });
          }
          setPeers((peers) => [...peers]);
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
      socket.on(CHAT_CHANNELS.LEAVE_CHAT_ROOM({ roomId }), (user) => {
        listPeerToSendStreamRef.current = listPeerToSendStreamRef.current.filter((p) => p.user._id != user._id);
        setPeers((prev) => [...prev.filter((p) => p.user._id != user._id)]);
      });
    }
    return () => {
      socket.off(CHAT_CHANNELS.JOIN_CHAT_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.USER_RECEIVED_SIGNAL_IN_ROOM({ roomId }));
      socket.off(CHAT_CHANNELS.USER_RECEIVED_RETURN_SIGNAL({ roomId }));
      socket.off(CHAT_CHANNELS.LEAVE_CHAT_ROOM({ roomId }));
    };
  }, []);
  return currentUser ? (
    <TGrid container spacing={1}>
      <TGrid height="100%" item xs={calculateVideosPerRow(peers.length + 1)}>
        <TVideoCallItem
          muted
          background="#000"
          height="100%"
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
        <TGrid height="100%" item key={index} xs={calculateVideosPerRow(peers.length + 1)}>
          <TPeerVideo
            height="100%"
            title={peer.user.fullName ?? peer.user.account}
            canToggleMedia={currentUser._id == creator._id}
            peer={peer.peer}
          />
        </TGrid>
      ))}
    </TGrid>
  ) : null;
};

export default TVideoCall;
