"use client";
import useClickOutside from "@/helper/useClickOutside";
import Image from "next/image";
import { useRef, useState } from "react";
import style from "@/styles/Profile.module.scss";
import icons from "@/public/icons.module.scss";

interface CoverProps {
  cover: string;
  visitor: boolean;
}

const Cover = ({ cover, visitor }: CoverProps) => {
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  return (
    <div className={style.profile_cover}>
      {cover && (
        <Image
          src={cover}
          className={style.cover}
          alt=""
          width={945}
          height={350}
        />
      )}
      {visitor && (
        <div className={style.udpate_cover_wrapper}>
          <div
            className={style.open_cover_update}
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className={icons.camera_filled_icon}></i>
            Add Cover Photo
          </div>
          {showCoverMneu && (
            <div className={style.open_cover_menu} ref={menuRef}>
              <div className={`${style.open_cover_menu_item} hover1`}>
                <i className={icons.photo_icon}></i>
                Select Photo
              </div>
              <div className={`${style.open_cover_menu_item} hover1`}>
                <i className={icons.upload_icon}></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cover;
