"use client"

import VideoPlayer from "@/components/Call/VideoPlayer"
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { useEffect, useState } from "react"
import SimplePeer, { SimplePeerData } from "simple-peer"

const peerConfig = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
}

type PeerUser = {
    [id: string]: SimplePeer.Instance
}

type StreamUser = {
    [id: string]: MediaStream
}

let conn : HubConnection | null= null;
let local : MediaStream | undefined= undefined;
const Page = () => {

    const [connection, setConnection] = useState<HubConnection | null>();
    const [peers, setPeers] = useState<PeerUser>({});
    const [localStream, setLocalStream] = useState<MediaStream>();
    const [remoteStreams, setRemoteStreams] = useState<StreamUser>({});

    const addPeer = (id: string, am_initiator: boolean) => {
        let lc = localStream;
        if (lc == null) {
            lc = local
        }

        peers[id] = new SimplePeer({
            initiator: am_initiator,
            stream: lc,
            config: peerConfig
        })

        setPeers({
            ...peers,
        })

        peers[id].on("signal", async data => {
            console.log(`From ${id} send Signal: ${data}`);
            console.log(data);
            
            let cons = connection
            if (cons == null) {
                cons = conn
            }
            console.log(conn);
            console.log("-------");
            await cons?.send("SignalTo", JSON.stringify({
                id: id,
                signal: data
            }))
        })

        peers[id].on("stream", stream => {
            remoteStreams[id] = stream
            setRemoteStreams({...remoteStreams})
        })

    }

    useEffect(()=>{
        const getLocal = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            local = stream
            setLocalStream(stream);
        }
        getLocal()

    },[])

    const init = async () => {
        const connect = new HubConnectionBuilder()
            .withUrl("http://192.168.1.7:10002/hub")
            .configureLogging(LogLevel.Information)
            .build();

        conn = connect;
        setConnection(connect)
        await connect.start()

        connect.on("InitRecieve", async id => {
            console.log(`Re Id: ${id}`);
            const idString = id as string
            addPeer(idString, false)

            await connect.send("InitSend", idString)
        })

        connect.on("InitSend", id => {
            console.log(`Se Id: ${id}`);
            addPeer(id, true)
        })

        connect.on("SignalTo", data => {
            console.log(`Signal ${data.id}`);
            console.log(data);
            console.log("----------");
            
            peers[data.id].signal(data.signal)
            
        })

        // connect.on("UserDisconnect", id => {
        //     console.log(`Re Id ${id}`);
        //     removePeer(id)
        // })


    }


    return(
        <div>
            <button onClick={init}>Start</button>
            <div style={{
                display: "flex"
            }}>
            <VideoPlayer localStream={localStream}/>
            {Object.keys(remoteStreams).map(it => {
                const stream = remoteStreams[it];
                return(
                    <VideoPlayer key={it} localStream={stream}/>
                )
            })}
            </div>

        </div>
    )
}

export default Page