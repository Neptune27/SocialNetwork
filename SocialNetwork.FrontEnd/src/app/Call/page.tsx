"use client"

import VideoPlayer from "@/components/Call/VideoPlayer";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";



const UUID = crypto.randomUUID()

type RTCCaller = {
  id : string,
  peer: RTCPeerConnection,
  isDone: boolean,
  stream ?: MediaStream
}

export default function Page() {
  // const [peer, setPeer] = useState<UserInfo>();
  // const [helloAnswer, setHelloAnswer] = useState<UserInfo>();
  // const [disconnectedPeer, setDisconnectedPeer] = useState<UserInfo>();
  // const [signal, setSignal] = useState<SignalInfo>();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [peers, setPeers] = useState<RTCCaller[]>([]);

  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [peer, setPeer] = useState<RTCPeerConnection>();

  const makeOffer = async (peerConnection: RTCPeerConnection) => {
    console.log("Making offer");
    console.log(connection);

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    await connection?.send("Signal", JSON.stringify({ id:UUID, 'offer': offer, type: "offer" }));
  }

  const handleOffer = async (offer: RTCSessionDescriptionInit, peerConnection: RTCPeerConnection | undefined) => {
    if (peerConnection == null) {
      return
    }
    console.log("Off");

    console.log(connection);
    

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    await connection?.send('Signal', JSON.stringify({
      id: UUID,
      type: 'answer',
      answer: peerConnection.localDescription
    }))
    // .then(() => socket.emit('signal', { type: 'answer', answer: peerConnection.localDescription }));
  }

  const handleAnswer = async (answer: RTCSessionDescriptionInit, peerConnection: RTCPeerConnection | undefined) => {
    if (peerConnection == null) {
      return
    }
    console.log("Ans");

    const remoteDesc = new RTCSessionDescription(answer);
    await peerConnection.setRemoteDescription(remoteDesc);
  }

  const handleCandidate = async (candidate: RTCIceCandidateInit, peerConnection: RTCPeerConnection | undefined) => {
    console.log(peerConnection);
    
    if (peerConnection == null) {
      return
    }
    console.log("Ice");
    
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection.addIceCandidate(iceCandidate);
  }

  useEffect(() => {
    const connceting = async () => {
      const connect = new HubConnectionBuilder()
        .withUrl("http://localhost:10002/hub")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
      setConnection(connect)

      await connect.start()
      console.log("Start connection");

    }
    connceting();
  }, [])

  const startConnection = async () => {


    const peerCon = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    })

    setPeer(peerCon)


    peerCon.ontrack = event => {
      console.log("Track");
      console.log(event);
      
      
      const stream = event.streams[0];
      setRemoteStream(remoteStream);
    }


    peerCon.onicecandidate = async event => {
      if (event.candidate) {
        await connection?.send('Signal', JSON.stringify({ id: UUID,  type: 'icecandidate', candidate: event.candidate }));
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    // Add stream to the peer connection
    stream.getTracks().forEach(track => peerCon.addTrack(track, stream));

    console.log(connection);
    
    connection?.on('GetSignal', text => {
      const data = JSON.parse(text)
      console.log("Signal");
      console.log(data);
      

      switch (data.type) {
        case 'offer':
          handleOffer(data.offer, peerCon);
          break;
        case 'answer':
          handleAnswer(data.answer, peerCon);
          break;
        case 'icecandidate':
          handleCandidate(data.candidate, peerCon);
          break;
        default:
          break;
      }
    })
  }

  const Of = () => {
    if (peer == null) {
      return
    }
    makeOffer(peer)
  }


  return (
    <div>
      <button onClick={startConnection}>Start</button>
      <button onClick={Of}>Offer</button>
      <VideoPlayer localStream={localStream} />
      {peers.filter(it => it.stream !== null).map(it => {
        return(
          <VideoPlayer key={it.id} localStream={it.stream}/>
        )
      })}

    </div>
  );
}
