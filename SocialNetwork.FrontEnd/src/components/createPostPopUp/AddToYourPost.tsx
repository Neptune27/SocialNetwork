import React from "react";
import { Dots, Feeling, Photo } from "@/public/svg";
import style from "@/components/createPostPopUp/style.module.scss";
import icons from "@/public/icons.module.scss";

interface AddToYourPostProps {
    setShowPrev: (value: boolean) => void;
}

const AddToYourPost = ({ setShowPrev }: AddToYourPostProps) => {
    return (
        <div className={style.addtoyourpost}>
            <div className={style.addto_text}>Add to your post</div>
            <div
                className={`${style.post_header_right} hover1`}
                onClick={() => {
                    setShowPrev(true);
                }}
            >
                <Photo color="#45bd62" />
            </div>
            <div className={`${style.post_header_right} hover1`}>
                <i className={icons.tag_icon}></i>
            </div>
            <div className={`${style.post_header_right} hover1`}>
                <Feeling color="#f7b928" />
            </div>
            <div className={`${style.post_header_right} hover1`}>
                <i className={icons.maps_icon}></i>
            </div>
            <div className={`${style.post_header_right} hover1`}>
                <i className={icons.microphone_icon}></i>
            </div>
            <div className={`${style.post_header_right} hover1`}>
                <Dots color="#65676b" />
            </div>
        </div>
    );
};

export default AddToYourPost;
