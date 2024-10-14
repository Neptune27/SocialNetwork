import React from "react";
import styles from "@/styles/leftHome.module.scss";
import Image from "next/image";

interface ShortcutProps {
  link: string;
  img: string;
  name: string;
}
const Shortcut = ({ link, img, name }: ShortcutProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={styles.shortcut_item}
    >
      <Image src={img} alt="" width={36} height={36} />
      <span>{name}</span>
    </a>
  );
};

export default Shortcut;
