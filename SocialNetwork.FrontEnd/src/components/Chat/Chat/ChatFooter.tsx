
import { Button } from "@/components/ui/button"
import { ChatInput } from "@/components/ui/chat/chat-input"
import { Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { authorizedFetch } from "../../../Ultility/authorizedFetcher"
import { api, ApiEndpoint } from "../../../api/const"
import { Input } from "../../ui/input"
import axios, { AxiosProgressEvent } from 'axios';
import useMessageHub from "../../../hooks/useMessageHub"
import AnimatedCircularProgressBar from "../../ui/animated-circular-progress-bar"
import { GoFileBinary } from "react-icons/go";
import { CgFilm } from "react-icons/cg";
import { motion } from "framer-motion"
type FileType = {
    source: File,
    progress: number,
    changedName: string,
    blobUrl?: string
}


type ChatProps = {
    file: FileType
}

type FileChangedType = {
    original: string,
    changed: string
}

type FileProgressType = {
    fileName: string,
    progress: number
}

const ChatFile = ({ file }: ChatProps) => {
    const fileType = file.source.type
    if (fileType.startsWith("image")) {
        return (
            <div className="relative">
                <img key={file.source.name} alt={file.source.name} src={file.blobUrl} className={"object-cover h-40 w-40 hover:object-scale-down rounded transition-all"} />
                {file.progress == 2
                    ? null
                    :
                    <div className="absolute inset-0 bg-white/50 ">
                        <AnimatedCircularProgressBar 
                            max={1.0526} min={0} value={file.progress}
                        gaugePrimaryColor="rgb(79 70 229)"
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                        />
                    </div>
                }
            </div>
            
        )
    }

    if (fileType.startsWith("video")) {
        return (
            <div className="relative w-40 h-40 truncate flex flex-col justify-between">
                <div className="flex justify-center">
                    <CgFilm size={125} />
                </div>
                <span className="">{file.source.name}</span>

                {file.progress == 2
                    ? null
                    :
                    <div className="absolute inset-0 bg-white/50">
                        <AnimatedCircularProgressBar
                            max={2} min={0} value={file.progress}
                            gaugePrimaryColor="rgb(79 70 229)"
                            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                        />
                    </div>
                }

            </div>

        )
    }

    return (
        <div className="relative w-40 h-40 truncate flex flex-col justify-between">
            <div className="flex justify-center">
                <GoFileBinary size={125} />
            </div>
            <span className="">{file.source.name}</span>

            {file.progress == 2
                ? null
                :
                <div className="absolute inset-0 bg-white/50">
                    <AnimatedCircularProgressBar
                        max={1.0526} min={0} value={file.progress}
                        gaugePrimaryColor="rgb(79 70 229)"
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                    />
                </div>
            }
        </div>
    )
}


let currentFiles: FileType[] = []

const ChatFooter = () => {

    const params = useParams()

    const inputRef = useRef<HTMLTextAreaElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const [isReady, setIsReady] = useState(true)
    const [files, setFiles] = useState<FileType[]>([])
    const hub = useMessageHub();


    const handleRecieveFileProgressUpdate = (data: FileProgressType) => {
        const file = files.find(f => f.source.name == data.fileName)
        if (file == undefined) {
            console.error("File not found?")
            return
        }

        file.progress = data.progress
        console.log("====FP====")
        console.log(data)
        console.log(file)
        setFiles([...files])
    }


    const handleRecieveFileChangedUpdate = (data: FileChangedType) => {
        const file = files.find(f => f.source.name == data.original)
        if (file == undefined) {
            console.error("File not found?")
            return
        }

        file.changedName = data.changed
        console.log("====FC====")
        console.log(data)
        console.log(file)
    }

    useEffect(() => {
        if (hub.hub == null) {
            return
        }
        const messageHub = hub.hub

        messageHub.on("RecieveFileProgressUpdate", handleRecieveFileProgressUpdate)
        messageHub.on("RecieveFileChangedUpdate", handleRecieveFileChangedUpdate)

        return () => {
            messageHub.off("RecieveFileChangedUpdate", handleRecieveFileChangedUpdate)
            messageHub.off("RecieveFileProgressUpdate", handleRecieveFileProgressUpdate)

        }
    }, [hub.hub, files])

    useEffect(() => {


        if (isReady) {
            setIsReady(false)
        }

        if (files.every(f => f.progress == 2)) {
            setIsReady(true)
        }

    }, [files])


    async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()
        if (inputRef.current == null) {
            return
        }

        setIsReady(false)


        const value = inputRef.current.value
        console.log(value)

        try {
            if (inputRef.current.value.trim() !== "") {
                await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Message`, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        roomId: Number(params.id),
                        content: value.trim(),
                        messageType: 0,
                        replyToId: 0
                    })
                })
            }

            if (files.every(f => f.progress == 2)) {

                for (const file of files) {
                    await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Message`, {
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            roomId: Number(params.id),
                            content: file.changedName,
                            messageType: 1,
                            replyToId: 0
                        })
                    })
                }

                setFiles([])

            }



            inputRef.current.value = ""
            setIsReady(true)


        }
        catch (e) {
            console.error(e)
            setIsReady(true)

        }

    }

    const uploadCallback = (event: AxiosProgressEvent, index: number, files: FileType[]) => {
        console.log(`Progress ${event.progress} at ${index}`)
        if (event.progress == undefined) {
            return
        }


        if (files[index].progress < event.progress)
            files[index].progress = event.progress
        setFiles([...files])

    }

    const handleUploadFile = (file: File, index: number, files: FileType[]) => {
        const data = new FormData();
        data.append('file', file);
        const resp = axios.post(`${api(ApiEndpoint.MESSAGING)}/File/`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            onUploadProgress: (e) => uploadCallback(e, index, files)
        })
    }


    const handleFile = () => {
        if (fileRef?.current?.files == null) {
            return
        }

        const inputFiles = [...fileRef.current.files]
        const filesWithProgress: FileType[] = inputFiles.map((f, i) => {


            let blobUrl = undefined;

            if (f.type.startsWith("image")) {
                blobUrl = URL.createObjectURL(f)
            }


            return {
                progress: 0,
                source: f,
                changedName: f.name,
                blobUrl: blobUrl
            }
        })

        console.log(files)

        setFiles(filesWithProgress)
        currentFiles = filesWithProgress
        currentFiles.forEach((f, i) => {
            handleUploadFile(f.source, i, currentFiles)
        })


        fileRef.current.value = ""
    }

    //const handleSubmit = (event: ) => {

    //}

    return (
        <div>
            <div className="flex gap-1 overflow-auto p-2">
                {files.map((f, i) => <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    key={`fileDiv${f.source.name}`}><ChatFile file={f} key={`file${f.source.name}`} /></motion.div>)}
            </div>
            <form onSubmit={handleSubmit}
                className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
            >
                <ChatInput ref={inputRef}
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                    <Button type="button" variant="ghost" size="icon">
                        <label htmlFor="file-input">
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                        </label>

                        <input ref={fileRef} onChange={handleFile} id="file-input" type="file" className="hidden" multiple />
                    </Button>

                    {/* <Button variant="ghost" size="icon">
        <Mic className="size-4" />
        <span className="sr-only">Use Microphone</span>
      </Button> */}

                    <Button disabled={!isReady}
                        size="sm"
                        className="ml-auto gap-1.5"
                    >
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </form>

        </div>
    )
}



export default ChatFooter