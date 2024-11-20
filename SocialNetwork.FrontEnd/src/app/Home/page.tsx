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

interface UserProps {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface Comment {
    comment: string;
    commentBy: string;
    commentAt: Date;
}

interface PostUser {
    username: string;
    picture: string;
    first_name: string;
    last_name: string;
    gender: "male" | "female";
}

interface PostData {
    user: PostUser;
    type: "profilePicture" | "cover" | null;
    text: string;
    images: string[];
    background?: string; // Optional
    comments: Comment[];
    createdAt: string;
}

const Home = () => {
    // Mock user data
    //const user: UserProps = {
    //    name: "Nguyen Huy",
    //    firstName: "Nguyen",
    //    lastName: "Huy",
    //    profilePicture: "/images/default_profile.png",
    //};

    const userStore = useCurrentUser();

    // Mock post data matching the Mongoose schema
    //const postVar: PostData = {
    //    user: {
    //        username: "johndoe",
    //        picture: "/images/default_profile.png",
    //        first_name: "John",
    //        last_name: "Doe",
    //        gender: "male",
    //    },
    //    type: "profilePicture",
    //    text: "This is a mock post description with multiple images.",
    //    images: ["/stories/1.jpg", "/stories/3.jpg"],
    //    background: "/images/postBackgrounds/1.jpg",
    //    comments: [
    //        {
    //            comment: "Great post!",
    //            commentBy: "user1",
    //            commentAt: new Date(),
    //        },
    //    ],
    //    createdAt: new Date().toISOString(),
    //};
    //const post2: PostData = {
    //    user: {
    //        username: "johndoe",
    //        picture: "/images/default_profile.png",
    //        first_name: "John",
    //        last_name: "Doe",
    //        gender: "male",
    //    },
    //    type: "profilePicture",
    //    text: "This is a mock post description with multiple images.",
    //    images: ["/stories/1.jpg"],

    //    comments: [
    //        {
    //            comment: "Great post!",
    //            commentBy: "user1",
    //            commentAt: new Date(),
    //        },
    //    ],
    //    createdAt: new Date().toISOString(),
    //};
    //const post3: PostData = {
    //    user: {
    //        username: "johndoe",
    //        picture: "/images/default_profile.png",
    //        first_name: "John",
    //        last_name: "Doe",
    //        gender: "male",
    //    },
    //    text: "This is a mock post description with multiple images.",
    //    images: ["/stories/1.jpg", "/stories/3.jpg"],

    //    comments: [
    //        {
    //            comment: "Great post!",
    //            commentBy: "user1",
    //            commentAt: new Date(),
    //        },
    //    ],
    //    createdAt: new Date().toISOString(),
    //};

    const middle = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [height, setHeight] = useState<number | undefined>();
    const userId = useUserId()


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

        getUser()
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
                    <Stories />
                    <CreatePost user={userStore.user} setVisible={setVisible} />
                    <div className={styles.posts}>

                        {/*<Post post={postVar} user={userStore.user} />*/}
                        {/*<Post post={userStore.user} user={user} />*/}
                        {/*<Post post={post3} user={user} />*/}

                        <LoadMore />
                    </div>
                </div>
                <RightHome user={userStore.user} />
            </div>
        </>

    );
};

export default Home;
