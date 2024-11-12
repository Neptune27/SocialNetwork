"use client";
import React, { useState, useRef } from "react";
import style from "@/styles/Profile.module.scss";
import icons from "@/public/icons.module.scss";
import Image from "next/image";
import ProfilePicture from "@/components/profilePicture";
import { Console } from "console";
import FriendShip from "./FriendShip";
interface Friendship {
    friends?: boolean;
    following?: boolean;
    requestSent?: boolean;
    requestReceived?: boolean;
}
interface ProfilePictureInfosProps {
    profile: {
        picture: string;
        first_name: string;
        last_name: string;
        friendship: Friendship
    };
    visitor: boolean;
}

const ProfilePictureInfos = ({ profile, visitor }: ProfilePictureInfosProps) => {
    const [show, setShow] = useState(false); 
    const pRef = useRef(null);
    console.log("From ProfilePictureInfos " + visitor)

    return (
        <div className={style.profile_img_wrap}>
            {show && <ProfilePicture setShow={setShow} pRef={pRef} />} 
            <div className={style.profile_w_left}>
                <div className={style.profile_w_img}>
                    <div
                        className={style.profile_w_bg}
                        style={{
                            backgroundSize: "cover",
                            backgroundImage: `url(${profile.picture})`,
                        }}
                    ></div>
                    {!visitor && (
                        <div
                            className={`${style.profile_circle} hover1`}
                            onClick={() => setShow(true)} 
                        >
                            <i className={icons.camera_filled_icon}></i>
                        </div>
                    )}
                </div>
                <div className={style.profile_w_col}>
                    <div className={style.profile_name}>
                        {profile.first_name} {profile.last_name}
                        <div className={style.othername}>Othername</div>
                    </div>
                    <div className={style.profile_friend_count}></div>
                    <div className={style.profile_friend_imgs}></div>
                </div>
            </div>
            {visitor ? (
                <FriendShip friendship={profile?.friendship} />
            ) : (
                <div className={style.profile_w_right}>
                    <div className="blue_btn">
                        <Image
                            src="/icons/plus.png"
                            alt="Add to story"
                            className={style.invert}
                            width={24}
                            height={24} 
                        />
                        <span>Add to story</span>
                    </div>
                    <div className="gray_btn">
                        <i className={icons.edit_icon}></i>
                        <span>Edit profile</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePictureInfos;
