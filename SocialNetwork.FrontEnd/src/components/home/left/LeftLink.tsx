import React from "react";
import styles from "@/styles/leftHome.module.scss";
import Image from "next/image";

interface LeftLinkProps {
  img: string;
  text: string;
  notification: string;
}

const LeftLink = ({ img, text, notification }: LeftLinkProps) => {
  return (
    <div className={`${styles.left_link} hover1`}>
      <Image src={img} alt="" width={36} height={36} />
      {notification ? (
        <div className={styles.col}>
          <div className={styles.col_1}>{text}</div>
          <div className={styles.col_2}>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default LeftLink;
