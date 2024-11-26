import { Feeling, LiveVideo, Photo } from "@/app/public/svg";
import styles from "@/styles/createPost.module.scss";
import React from "react";
import Image from "next/image";
import icons from "@/public/icons.module.scss";

interface User {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface CreatePostProps {
    user: User;
    setVisible: (visible: boolean) => void;
    profile?: boolean;
}

const CreatePost = ({ user, setVisible, profile }: CreatePostProps) => {
    return (
        <div className={styles.createPost}>
            <div className={styles.createPost_header} onClick={() => {
                setVisible(true);
            }}>
                <img src={user?.profilePicture} alt="" width={40} height={40} />
                <div
                    className={`${styles.open_host} hover2`}

                >
                    What&apos;s on your mind
                </div>
            </div>
            <div className={styles.create_splitter}></div>
            {/*<div className={styles.createPost_body}>*/}
            {/*    <div className={`${styles.createPost_icon} hover1`}>*/}
            {/*        <LiveVideo color="#f3425f" />*/}
            {/*        Live Video*/}
            {/*    </div>*/}
            {/*    <div className={`${styles.createPost_icon} hover1`}>*/}
            {/*        <Photo color="#4bbf67" />*/}
            {/*        Photo/Video*/}
            {/*    </div>*/}
            {/*    {profile ? (*/}
            {/*        <div className={`${styles.createPost_icon} hover1`}>*/}
            {/*            <i className={icons.lifeEvent_icon}></i>*/}
            {/*            Life Event*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div className={`${styles.createPost_icon} hover1`}>*/}
            {/*            <Feeling color="#f7b928" />*/}
            {/*            Feeling/Activity*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default CreatePost;
