import React from "react";
import Image from "next/image";
import styles from "@/styles/header.module.scss";

interface AllMenuItemProps {
  name: string;
  description: string;
  icon: string;
}

const AllMenuItem = ({ name, description, icon }: AllMenuItemProps) => {
  return (
    <div className={styles.allMenuItem}>
      <div className={styles.iconContainer}>
        <Image
          src={icon} // Đường dẫn hình ảnh từ thư mục public
          alt={`${name} icon`}
          width={40} // Chiều rộng hình ảnh
          height={40} // Chiều cao hình ảnh
        />
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default AllMenuItem;
