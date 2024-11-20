import Image from "next/image";
import React, { useRef } from "react";
import Detail from "./Detail";
import style from "@/components/intro/style.module.scss";
import icons from "@/public/icons.module.scss";
import useClickOutside from "../../helper/useClickOutside";

interface EditDetailProps {
    details: {
        othername?: string;
        job?: string;
        workplace?: string;
        highSchool?: string;
        college?: string;
        currentCity?: string;
        hometown?: string;
        relationship?: string;
        instagram?: string;
        firstName?: string;
        lastName?: string;
        location?: string;
        twitter?: string;
        github?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    updateDetails: (nameInfo: string, value: string) => void;
    infos?: any;
    setVisible: (visible: boolean) => void;
}

const EditDetail: React.FC<EditDetailProps> = ({ details, handleChange, updateDetails, infos, setVisible }) => {
    const modal = useRef<HTMLDivElement>(null);
    useClickOutside(modal, () => setVisible(false));

    return (
        <div className={style.blur_background}>
            <div ref={modal} className={`${style.postBox} ${style.infosBox}`}>
                <div className={style.box_header}>
                    <div className="small_circle" onClick={() => setVisible(false)}>
                        <i className={icons.exit_icon}></i>
                    </div>
                    <span>Edit Details</span>
                </div>
                <div className={`${style.details_wrapper} scrollbar`}>
                    <div className={style.details_col}>
                        <span>Customize Your Intro</span>
                        <span>Details you select will be public</span>
                    </div>
                    <Detail
                        header="Other Name"
                        value={details.othername}
                        img="studies"
                        placeholder="Add other name"
                        name="othername"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header }>FirstLastName</div>
                    <Detail
                        value={details.firstName}
                        img="job"
                        placeholder="Add First Name"
                        name="firstName"
                        text="a job"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <Detail
                        value={details.lastName}
                        img="job"
                        placeholder="Add a LastName"
                        name="lastName"
                        text="workplace"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header}>Education</div>
                    <Detail
                        value={details.highSchool}
                        img="studies"
                        placeholder="Add a high school"
                        name="highSchool"
                        text="a high school"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <Detail
                        value={details.college}
                        img="studies"
                        placeholder="Add a college"
                        name="college"
                        text="college"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header }>Current City</div>
                    <Detail
                        value={details.currentCity}
                        img="home"
                        placeholder="Add a current city"
                        name="currentCity"
                        text="a current city"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header }>Hometown</div>
                    <Detail
                        value={details.hometown}
                        img="home"
                        placeholder="Add hometown"
                        name="hometown"
                        text="hometown"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header }>Relationship</div>
                    <Detail
                        value={details.relationship}
                        img="relationship"
                        placeholder="Add relationship status"
                        name="relationship"
                        text="relationship"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                        rel
                    />
                    <div className={style.details_header }>Location</div>
                    <Detail
                        value={details.location}
                        img="home"
                        placeholder="Add Location"
                        name="location"
                        text="location"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header}>Instagram</div>
                    <Detail
                        value={details.instagram}
                        img="home"
                        placeholder="Add Instagram"
                        name="instagram"
                        text="instagram"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header}>Twitter</div>
                    <Detail
                        value={details.twitter}
                        img="home"
                        placeholder="Add Twitter"
                        name="twitter"
                        text="twitter"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                    <div className={style.details_header}>GitHub</div>
                    <Detail
                        value={details.github}
                        img="home"
                        placeholder="Add Github"
                        name="github"
                        text="github"
                        handleChange={handleChange}
                        updateDetails={updateDetails}
                        infos={infos}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditDetail;
