"use client"

import Post from "."
import usePopupPost from "../../hooks/Posts/usePopupPost"
import { Dialog, DialogContent } from "../ui/dialog"

const PopupPostDialog = () => {
    const popupStore = usePopupPost()
    const userStore = useCurrentUser();

    const data = popupStore.data

    const handleOnOpenChanged = (open: boolean) => {
        data.open = open
        popupStore.set(data)
    }

    return (
        <Dialog open={data?.open} onOpenChange={handleOnOpenChanged}>
            {/*<DialogTrigger asChild>*/}
            {/*    <Button variant="outline">Edit Profile</Button>*/}
            {/*</DialogTrigger>*/}
            <DialogContent className="sm:max-w-[425px]">
                {popupStore.data.post ? <Post key={`popupPost`} post={data.post} user={userStore.user} /> : null}
            </DialogContent>
        </Dialog>

    )
}

export default PopupPostDialog