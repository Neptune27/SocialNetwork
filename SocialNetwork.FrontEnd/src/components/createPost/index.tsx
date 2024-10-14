import { Feeling, LiveVideo, Photo } from "@/public/svg";
import styles from "@/styles/createPost.module.scss";
import React from "react";
import Image from "next/image";

interface CreatePostProps {
  user: {
    name: string;
    profilePicture: string;
  };
}

const CreatePost = ({ user }: CreatePostProps) => {
  return (
    <div className={styles.createPost}>
      <div className={styles.createPost_header}>
        <Image src={user?.profilePicture} alt="" width={40} height={40} />
        <div className={`${styles.open_host} hover2`}>
          What&apos;s on your mind, {user?.name}
        </div>
      </div>
      <div className={styles.create_splitter}></div>
      <div className={styles.createPost_body}>
        <div className={`${styles.createPost_icon} hover1`}>
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className={`${styles.createPost_icon} hover1`}>
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className={`${styles.createPost_icon} hover1`}>
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
