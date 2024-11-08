import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { PhoneCallIcon, VideoIcon } from "lucide-react"
import { SidebarTrigger } from "../../ui/sidebar"

type Props = {
    profile: string,
    name: string,
    total: number,
    status?: string
}

const ChatHeader = ({name, profile, total, status}: Props) => {


    return(
        <div className={"flex justify-between gap-2 p-2"}>
            <SidebarTrigger />
            <div className={cn("flex gap-2")}>
                <Avatar>
                    <AvatarImage src={profile}/>
                </Avatar>
                
                <div>
                    <h2>{name}</h2>
                    {total > 2 ? <div>{total} members</div>
                        : <div>{status}</div>}
                </div>
            </div>
            <div className="flex gap-2">
                <div>
                    <TooltipProvider>
                        <Tooltip>

                        <TooltipTrigger>
                            <PhoneCallIcon/>
                        </TooltipTrigger>
                        <TooltipContent>
                            Make a phone call
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <VideoIcon />
                            </TooltipTrigger>
                            <TooltipContent>
                                Make a video call
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>

    )
}

export default ChatHeader