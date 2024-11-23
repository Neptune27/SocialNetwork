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

interface UserProps {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface CommentBy {
    picture: string;
    first_name: string;
    last_name: string;
}

interface Comment {
    comment: string;
    commentBy: CommentBy;
    commentAt: Date;
    image?: string; // Optional image
    replies?: Comment[]; // Nested replies
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
    const user: UserProps = {
        name: "Nguyen Huy",
        firstName: "Nguyen",
        lastName: "Huy",
        profilePicture: "/images/default_profile.png",
    };

    const postVar: PostData = {
        user: {
            username: "johndoe",
            picture: "/images/default_profile.png",
            first_name: "John",
            last_name: "Doe",
            gender: "male",
        },
        type: "profilePicture",
        text: "This is a mock post description with multiple images.",
        images: ["/stories/1.jpg", "/stories/3.jpg"],
        background: "/images/postBackgrounds/1.jpg",
        comments: [
            {
                comment: "Great post!",
                commentBy: {
                    picture: "/images/default_profile.png",
                    first_name: "Jane",
                    last_name: "Smith",
                },
                commentAt: new Date("2024-11-22T10:00:00"),
            },
            {
                comment: "Amazing photo!",
                commentBy: {
                    picture: "/images/default_profile.png",
                    first_name: "David",
                    last_name: "Lee",
                },
                commentAt: new Date("2024-11-22T12:30:00"),
            },
        ],
        createdAt: new Date().toISOString(),
    };

    const postWithReplies = {
        user: {
            username: "johndoe",
            picture: "/images/default_profile.png",
            first_name: "John",
            last_name: "Doe",
            gender: "male",
        },
        type: null, // Regular post
        text: "Enjoying the sunset at the beach!",
        images: ["/stories/1.jpg"],
        comments: [
            {
                id: "comment1",
                comment: "Wow, that's beautiful!",
                image: "/images/comment1.jpg",
                commentBy: {
                    username: "alicewong",
                    picture: "/stories/1.jpg",
                    first_name: "Alice",
                    last_name: "Wong",
                    gender: "female",
                },
                commentAt: new Date(),
                likes: 10,
                replies: [
                    {
                        id: "reply1",
                        comment: "Absolutely! Where is this?",
                        commentBy: {
                            username: "chris_evans",
                            picture: "/images/user2.png",
                            first_name: "Chris",
                            last_name: "Evans",
                            gender: "male",
                        },
                        commentAt: new Date(),
                    },
                    {
                        id: "reply2",
                        comment: "Looks like paradise!",
                        image: "/stories/1.jpg",
                        commentBy: {
                            username: "natasha_romanoff",
                            picture: "/stories/2.png",
                            first_name: "Natasha",
                            last_name: "Romanoff",
                            gender: "female",
                        },
                        commentAt: new Date(),
                    },
                ],
            },
            {
                id: "comment2",
                comment: "Amazing view! Thanks for sharing.",
                commentBy: {
                    username: "bruce_banner",
                    picture: "/images/user4.png",
                    first_name: "Bruce",
                    last_name: "Banner",
                    gender: "male",
                },
                commentAt: new Date(),
            },
        ],
        createdAt: new Date().toISOString(),
    };



    const middle = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [height, setHeight] = useState<number | undefined>();

    useEffect(() => {
        if (middle.current) {
            setHeight(middle.current.clientHeight);
        }
    }, []);

    return (
        <>
            {visible && <CreatePostPopUp user={user} setVisible={setVisible} />}
            <div
                className={styles.home}
                style={{ height: `${(height || 0) + 150}px` }}
            >
                <UserHeader user={user} page={"home"} />
                <LeftHome user={user} />
                <div className={styles.home_middle} ref={middle}>
                    <Stories />
                    <CreatePost user={user} setVisible={setVisible} />
                    <div className={styles.posts}>
                        <Post post={postVar} user={user} />
                        <Post post={postWithReplies} user={user} />

                    </div>
                </div>
                <RightHome user={user} />
            </div>
        </>
    );
};

export default Home;
