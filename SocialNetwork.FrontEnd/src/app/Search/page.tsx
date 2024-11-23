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
import { useParams } from "next/navigation";

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
    const params = useParams()

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
            const query = params.q
            const resp = await authorizedFetch(`${api(ApiEndpoint.POST)}/Search?q=${query}`)
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
                    {/*<CreatePost user={userStore.user} setVisible={setVisible} />*/}
                    <div className={styles.posts}>
                        {postStore.posts.map((p) => <Post key={p.id} post={p} user={userStore.user} />)}
                    </div>
                </div>
                <RightHome user={userStore.user} />
            </div>
        </>

    );
};

export default Home;
