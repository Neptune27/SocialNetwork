"use client";
import { useRef, useState, useEffect } from "react";
import UserHeader from "@/components/header/header";
import LeftHome from "@/components/home/left";
import RightHome from "@/components/home/right";
import Stories from "@/components/home/stories";
import CreatePost from "@/components/createPost";
import CreatePostPopUp from "@/components/createPostPopUp";
import Post from "@/components/post";
import styles from "@/styles/homeLayout.module.scss";
import LoadMore from "@/components/post/LoadMore"
import useCurrentUser from "../../hooks/useCurrentUser";
import Loading from "../../components/Loading";
import { authorizedFetch } from "../../Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "../../api/const";
import useUserId from "../../hooks/useUserId";
import { User } from "lucide-react";
import usePosts from "../../hooks/Posts/usePosts";
import usePopupPost from "../../hooks/Posts/usePopupPost";
import { Dialog, DialogContent, DialogHeader } from "../../components/ui/dialog";
import PopupPostDialog from "../../components/post/PopupPostDialog";
import useNotificationHub from "../../hooks/useNotificationHub";
import useAuthorizeHub from "../../hooks/useAuthorizeHub";

interface UserProps {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}


const Home = () => {
    const userStore = useCurrentUser();
    const postStore = usePosts()
    const middle = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    //const [posts, setPosts] = useState<PostData[]>([]) //Make this into global
    const [height, setHeight] = useState<number | undefined>();
    const userId = useUserId()

    const notificationHub = useNotificationHub()

    useEffect(() => {
        if (notificationHub.hub) {
            return
        }

        const hub = useAuthorizeHub(`${api(ApiEndpoint.NOTIFICATION)}/hub`)
        notificationHub.set(hub)
    }, [])

    const handlePost = async (data: any) => {
        console.log(data)
        const post = postStore.posts.find(p => p.id == data.fromId)
        if (post == undefined) {
            return
        }
        const resp = await authorizedFetch(`${api(ApiEndpoint.POST)}/Comment/ByPost/${post.id}`)
        const newComments = await resp.json()
        console.log(newComments)
        const size = post.comments.length;
        post.comments.splice(0, size, ...newComments)
        postStore.set(postStore.posts)
        console.log(post)
    }

    useEffect(() => {
        if (notificationHub.hub == null) {
            return
        }

        const hub = notificationHub.hub
        hub.on("POST", handlePost)

        return () => {
            hub.off("POST", handlePost)
        }

    }, [notificationHub, handlePost])

    //useEffect(() => {
    //    if (middle.current) {
    //        setHeight(middle.current.clientHeight);
    //    }
    //}, []);

    useEffect(() => {
        const getUser = async () => {
            const resp = await authorizedFetch(`${api(ApiEndpoint.PROFILE)}/Profile/${userId}`)
            const data = await resp.json()
            const user = data["user"]
            userStore.set({
                firstName: user["firstName"],
                lastName: user["lastName"],
                name: user["userName"],
                profilePicture: `${api(ApiEndpoint.PROFILE)}/${user["profilePicture"]}`
            })

        }

        const getPost = async () => {
            const resp = await authorizedFetch(`${api(ApiEndpoint.POST)}/Post`)
            const data = await resp.json()

            console.log(data)
            postStore.set(data)
        }

        getUser()
        getPost()
    }, [])

    if (userStore.user == null) {
        return (
            <Loading />
        )
    }

    return (
        <>
            {visible && <CreatePostPopUp user={userStore.user} setVisible={setVisible} />}
            <div
                className={styles.home}
                style={{ height: `${(height || 0) - 150}px` }}
            >
                <UserHeader user={userStore.user} page={"home"} />
                <LeftHome user={userStore.user} />
                <div className={styles.home_middle} ref={middle}>
                    {/*<Stories />*/}
                    <CreatePost user={userStore.user} setVisible={setVisible} />
                    <div className={styles.posts}>
                        {postStore.posts.map((p) => <Post key={`post-${p.id}`} post={p} user={userStore.user} isPopup={false} />)}
                    </div>
                </div>
                <RightHome user={userStore.user} />
            </div>
            <PopupPostDialog />
        </>

    );
};

export default Home;
