import React from "react";
import style from "@/components/intro/style.module.scss";
import icons from "@/public/icons.module.scss";

interface BioProps {
    infos: { bio: string };
    handleBioChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    max: number;
    setShowBio: (show: boolean) => void;
}

const Bio = ({ infos, handleBioChange, max, setShowBio }: BioProps) => {
    const remainingChars = max - (infos.bio?.length || 0);

    return (
        <div className={style.add_bio_wrap}>
            <textarea
                placeholder="Add Bio"
                name="bio"
                value={infos.bio}
                maxLength={max}
                className={`${style.details_input} ${style.textarea_blue}`}
                onChange={handleBioChange}
            ></textarea>
            <div className={style.remaining}>{remainingChars} characters remaining</div>
            <div className="flex">
                <div className={`flex ${style.flex_left}`}>
                    <i className={icons.public_icon}></i>Public
                </div>
                <div className={`flex ${style.flex_right}`}>
                    <button className="gray_btn" onClick={() => setShowBio(false)}>
                        Cancel
                    </button>
                    <button className="blue_btn">Save</button>
                </div>
            </div>
        </div>
    );
};

export default Bio;
