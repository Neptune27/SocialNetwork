import React from "react";
import styles from "@/styles/stories.module.scss";
import Image from "next/image";

interface storyProps {
  image: string;
  profile_picture: string;
  profile_name: string;
}

const Story = ({ image, profile_picture, profile_name }: storyProps) => {
  return (
    <div className={styles.story}>
      <Image src={image} alt="" fill className={styles.story_img} />
      <div className={styles.story_profile_pic}>
        <Image src={profile_picture} alt="" fill />
      </div>
      <div className={styles.story_profile_name}>{profile_name}</div>
    </div>
  );
};

export default Story;
