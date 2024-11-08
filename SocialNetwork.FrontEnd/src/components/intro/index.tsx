import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "@/components/intro/style.module.scss";
import icons from "@/public/icons.module.scss";
import Bio from "./Bio";
import EditDetails from "./EditDetail";

interface IntroProps {
    details: {
        bio?: string;
        othername?: string;
        job?: string;
        workplace?: string;
        highSchool?: string;
        college?: string;
        currentCity?: string;
        hometown?: string;
        relationship?: string;
        instagram?: string;
    };
    visitor: boolean;
}

const Intro = ({ details, visitor }: IntroProps) => {
    const [currentDetails, setCurrentDetails] = useState(details);
    const [visible, setVisible] = useState(false);
    const [showBio, setShowBio] = useState(false);

    const initial = {
        bio: details.bio || "",
        othername: details.othername || "NguyenHuy",
        job: details.job || "",
        workplace: details.workplace || "Google",
        highSchool: details.highSchool || "some high school",
        college: details.college || "some college",
        currentCity: details.currentCity || "Tanger",
        hometown: details.hometown || "Morocco",
        relationship: details.relationship || "Single",
        instagram: details.instagram || "med_hajji7",
    };

    const [infos, setInfos] = useState(initial);
    const [max, setMax] = useState(100 - (infos.bio.length || 0));

    useEffect(() => {
        setCurrentDetails(details);
        setInfos(initial);
    }, [details]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBio = e.target.value;
        setInfos(prevInfos => ({ ...prevInfos, bio: newBio }));
        setMax(100 - newBio.length);
    };

    const updateDetails = () => {
        setCurrentDetails(infos);
        setShowBio(false);
    };

    const renderEditButton = (text: string, onClick: () => void) => (
        <button className="gray_btn hover1 w100" onClick={onClick}>{text}</button>
    );

    return (
        <div className={style.profile_card}>
            <div className={style.profile_card_header}>Intro</div>

            {infos.bio && !showBio && (
                <div className={style.info_col}>
                    <span className={style.info_text}>{infos.bio}</span>
                    {visitor && renderEditButton("Edit Bio", () => setShowBio(true))}
                </div>
            )}

            {showBio && (
                <Bio
                    infos={infos}
                    max={max}
                    handleChange={handleChange}
                    setShowBio={setShowBio}
                    placeholder="Add Bio"
                    name="bio"
                />
            )}

            {infos.job && infos.workplace && (
                <div className={style.info_profile}>
                    <Image src="/icons/job.png" alt="Job icon" width={24} height={24} />
                    works as {infos.job} at <b>{infos.workplace}</b>
                </div>
            )}
            {infos.relationship && (
                <div className={style.info_profile}>
                    <Image src="/icons/relationship.png" alt="Relationship icon" width={24} height={24} />
                    {infos.relationship}
                </div>
            )}
            {infos.college && (
                <div className={style.info_profile}>
                    <Image src="/icons/studies.png" alt="College icon" width={24} height={24} />
                    studied at {infos.college}
                </div>
            )}
            {infos.highSchool && (
                <div className={style.info_profile}>
                    <Image src="/icons/studies.png" alt="High school icon" width={24} height={24} />
                    studied at {infos.highSchool}
                </div>
            )}
            {infos.currentCity && (
                <div className={style.info_profile}>
                    <Image src="/icons/home.png" alt="Current city icon" width={24} height={24} />
                    Lives in {infos.currentCity}
                </div>
            )}
            {infos.hometown && (
                <div className={style.info_profile}>
                    <Image src="/icons/home.png" alt="Hometown icon" width={24} height={24} />
                    From {infos.hometown}
                </div>
            )}
            {infos.instagram && (
                <div className={style.info_profile}>
                    <Image src="/icons/instagram.png" alt="Instagram icon" width={24} height={24} />
                    <a
                        href={`https://www.instagram.com/${infos.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {infos.instagram}
                    </a>
                </div>
            )}

            {visitor && renderEditButton("Edit Details", () => setVisible(true))}
            {visitor && visible && (
                <EditDetails
                    details={currentDetails}
                    handleChange={handleChange}
                    updateDetails={updateDetails}
                    infos={infos}
                    setVisible={setVisible}
                />
            )}

            {visitor && renderEditButton("Add Hobbies", () => { })}
            {visitor && renderEditButton("Add Featured", () => { })}
        </div>
    );
};

export default Intro;
