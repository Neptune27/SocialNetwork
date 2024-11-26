import Image from "next/image";
import React from "react";
import styles from "@/styles/rightHome.module.scss";
import Link from "next/link";

interface UserProps {
    user: {
        id: string;
        name: string;
        userName?: string;
        profilePicture: string;
    };
}
const Contact = ({ user }: UserProps) => {

    if (user.id == undefined) {
        user.id = ""
    }
    return (
        <Link className={`${styles.contact} hover3`} href={`/Profile?profileId=${user.id}`}>
            <div className={styles.contact_img}>
                <img src={user.profilePicture} alt="" width={36} height={36} />
            </div>
            {user.name && <span>{user.name}</span>}
            {user.userName && <span>{user.userName}</span>}
            
        </Link>
    );
};

export default Contact;
