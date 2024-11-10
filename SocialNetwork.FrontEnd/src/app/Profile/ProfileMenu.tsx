import React from "react";
import style from "@/styles/Profile.module.scss";
import icons from "@/public/icons.module.scss";
import Link from "next/link";
import { Dots } from "@/public/svg";

const ProfileMenu = () => {
  return (
    <div className={style.profile_menu_wrap}>
      <div className={style.profile_menu}>
        <Link href="/" className={style.profile_menu_active}>
          Posts
        </Link>
        <Link href="/" className="hover1">
          About
        </Link>
        <Link href="/" className="hover1">
          Friends
        </Link>
        <Link href="/" className="hover1">
          Phohrefs
        </Link>
        <Link href="/" className="hover1">
          Videos
        </Link>
        <Link href="/" className="hover1">
          Check-ins
        </Link>
        <Link href="/" className="hover1">
          More
        </Link>
        <div className={style.p10_dots}>
          <Dots color={"#000"} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
