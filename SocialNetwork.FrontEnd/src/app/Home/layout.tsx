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
    const user: UserProps = {
        name: "Nguyen Huy",
        firstName: "Nguyen",
        lastName: "Huy",
        profilePicture: "/images/default_profile.png",
    };

    // Mock post data matching the Mongoose schema
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
                commentBy: "Jane Smith",
                commentAt: new Date("2024-11-22T10:00:00"),
            },
            {
                comment: "Amazing photo!",
                commentBy: "David Lee",
                commentAt: new Date("2024-11-22T12:30:00"),
            },
            {
                comment: "Looking good, John!",
                commentBy: "Sarah Connor",
                commentAt: new Date("2024-11-22T15:00:00"),
            },
        ],
        createdAt: new Date().toISOString(),
    };

    const post2: PostData = {
        user: {
            username: "janedoe",
            picture: "/images/default_pic.png",
            first_name: "Jane",
            last_name: "Doe",
            gender: "female",
        },
        type: "cover",
        text: "Here's my new cover photo. What do you think?",
        images: ["/stories/2.jpg"],
        comments: [
            {
                comment: "Love the new cover!",
                commentBy: "Michael Johnson",
                commentAt: new Date("2024-11-21T18:45:00"),
            },
            {
                comment: "So stylish!",
                commentBy: "Anna Brown",
                commentAt: new Date("2024-11-21T20:00:00"),
            },
        ],
        createdAt: new Date().toISOString(),
    };

    const post3: PostData = {
        user: {
            username: "alicewong",
            picture: "/images/default_profile.png",
            first_name: "Alice",
            last_name: "Wong",
            gender: "female",
        },
        type: null, // Regular post
        text: "Had a fantastic weekend exploring the mountains!",
        images: ["/stories/4.jpg", "/stories/5.jfif", "/stories/3.jpg"],
        comments: [
            {
                comment: "The view looks incredible!",
                commentBy: "Chris Evans",
                commentAt: new Date("2024-11-20T14:30:00"),
            },
            {
                comment: "I wish I was there too 😍",
                commentBy: "Natasha Romanoff",
                commentAt: new Date("2024-11-20T15:00:00"),
            },
            {
                comment: "Nature at its best!",
                commentBy: "Bruce Banner",
                commentAt: new Date("2024-11-20T16:15:00"),
            },
            {
                comment: "Wow, this is so peaceful!",
                commentBy: "Steve Rogers",
                commentAt: new Date("2024-11-20T17:45:00"),
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
                        <Post post={post2} user={user} />
                        <Post post={post3} user={user} />
                    </div>
                </div>
                <RightHome user={user} />
            </div>
        </>
    );
};

export default Home;
