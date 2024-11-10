"use client";
import React, { useRef, useState } from "react";
import style from "@/components/profilePicture/style.module.scss";
import icons from "@/public/icons.module.scss";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useOnClickOutside from "../../helper/useClickOutside";
import Image from "next/image";

interface ProfilePictureProps {
    setShow: (value: boolean) => void;  // Thêm type cho setShow
    pRef: React.RefObject<HTMLDivElement>;  // Thêm type cho pRef
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ setShow, pRef }) => {  // Sửa lại props
    const popup = useRef(null);
    useOnClickOutside(popup, () => setShow(false));
    const refInput = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif"
        ) {
            setError(`${file.name} format is not supported.`);
            return;
        } else if (file.size > 1024 * 1024 * 5) {
            setError(`${file.name} is too large. Max 5MB allowed.`);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            if (event.target?.result) {
                setImage(event.target.result as string);
            }
        };
    };

    return (
        <div className={style.blur_background}>
            <input
                type="file"
                ref={refInput}
                hidden
                onChange={handleImage}
                accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <div className={`${style.postBox} ${style.pictureBox}`}>
                <div className={style.box_header}>
                    <div className={style.small_circle} onClick={() => setShow(false)}>
                        <i className={icons.exit_icon}></i>
                    </div>
                    <span>Update profile picture</span>
                </div>
                <div className={style.update_picture_wrap}>
                    <div className={style.update_picture_buttons}>
                        <button
                            className={style.light_blue_btn}
                            onClick={() => refInput.current?.click()}
                        >
                            <i className={`${icons.plus_icon} filter_blue`}></i>
                            Upload photo
                        </button>
                        <button className="gray_btn">
                            <i className={icons.frame_icon}></i>
                            Add frame
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="postError comment_error">
                        <div className="postError_error">{error}</div>
                        <button className="blue_btn" onClick={() => setError("")}>
                            Try again
                        </button>
                    </div>
                )}
                {/*old picture*/}
                <div className={`${style.old_pictures_wrap} scrollbar`}>
                    <h4>your profile pictures</h4>
                    <div className={style.old_pictures}>
                        <Image src={"/stories/1.jpg"} alt="" width={100} height={105} />
                        <Image src={"/stories/2.png"} alt="" width={100} height={105} />
                        <Image src={"/stories/3.jpg"} alt="" width={20} height={105} />
                    </div>
                    <h4>other pictures</h4>
                    <div className={style.old_pictures }>
                        <Image src={"/stories/4.jpg"} alt="" width={20} height={105} />
                        <Image src={"/stories/5.jfif"} alt="" width={20} height={105} />
                    </div>
                </div>
            </div>
            {image && <UpdateProfilePicture setImage={setImage} image={image} setShow={setShow} pRef={pRef} />}
        </div>
    );
};

export default ProfilePicture;
