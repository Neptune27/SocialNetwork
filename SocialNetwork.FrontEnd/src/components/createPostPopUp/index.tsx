"use client";
import React, { useState, useRef } from "react";
import style from "@/components/createPostPopUp/style.module.scss";
import icons from "@/public/icons.module.scss";
import Image from "next/image";
import AddToYourPost from "./AddToYourPost";
import EmojiPickerBackground from "./EmojiPickerBackground";
import ImagePreview from "./ImagePreview";
import useClickOutside from "@/helper/useClickOutside";
import { FileType } from "../../interfaces/IFileType";
import { authorizedFetch } from "../../Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "../../api/const";
import axios from "axios";
import useToken from "../../hooks/useToken";

interface User {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface CreatePostPopUpProps {
    user: User;
    setVisible: (visible: boolean) => void;
}

const CreatePostPopUp = ({ user, setVisible }: CreatePostPopUpProps) => {
    const [text, setText] = useState<string>(""); // Specify type explicitly
    const [showPrev, setShowPrev] = useState<boolean>(false); // Explicitly type boolean state
    const [files, setFiles] = useState<FileType[]>([]);
    const [error, setError] = useState<string>("");
    const [background, setBackground] = useState<string>("");

    const popupRef = useRef<HTMLDivElement>(null);

    const handlePostSubmit = async () => {
        const formData = new FormData();
        formData.append("message", text)
        formData.append("background", `${background}`)
        files.forEach(f => formData.append("files", f.source))
        const token = useToken()

        const resp = await axios.post(`${api(ApiEndpoint.POST)}/Post`, formData, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        if (resp.status == 200) {
            window.location.reload()
        }
    }

    // Close the popup when clicking outside
    useClickOutside(popupRef, () => {
        setVisible(false);
    });

    return (
        <div className={style.blur_background}>
            <div className={style.postBox} ref={popupRef}>
                <div className={style.box_header}>
                    <div
                        className={style.small_circle}
                        onClick={() => {
                            setVisible(false);
                        }}
                    >
                        <i className={icons.exit_icon}></i>
                    </div>
                    <span>Create Post</span>
                </div>
                <div className={style.box_profile}>
                    <img
                        src={user.profilePicture}
                        alt="User profile picture"
                        className={style.box_profile_img}
                        width={30}
                        height={30}
                    />
                    <div className={style.box_col}>
                        <div className={style.box_profile_name}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className={style.box_privacy}>
                            <Image
                                src="/icons/public.png"
                                alt="Public icon"
                                width={30}
                                height={30}
                            />
                            <span>Public</span>
                            <i className={icons.arrowDown_icon}></i>
                        </div>
                    </div>
                </div>

                {!showPrev ? (
                    <EmojiPickerBackground
                        text={text}
                        user={user}
                        setText={setText}
                        showPrev={showPrev}
                        background={background}
                        setBackground={setBackground}
                    />
                ) : (
                    <ImagePreview
                        text={text}
                        user={user}
                        setText={setText}
                        showPrev={showPrev}
                        files={files}
                        setFiles={setFiles}
                        setShowPrev={setShowPrev}
                        setError={setError}
                    />
                )}
                <AddToYourPost setShowPrev={setShowPrev} />
                <button className={style.post_submit} onClick={handlePostSubmit}>Post</button>
            </div>
        </div>
    );
};

export default CreatePostPopUp;
