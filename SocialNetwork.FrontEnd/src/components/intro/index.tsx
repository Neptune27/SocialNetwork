import Image from "next/image";
import React, { useState } from "react";
import style from "@/components/intro/style.module.scss";
import icons from "@/public/icons.module.scss";
import Bio from "./Bio";

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
    const initial = {
        bio: details?.bio || "",
        othername: details?.othername || "",
        job: details?.job || "",
        workplace: details?.workplace || "Google",
        highSchool: details?.highSchool || "some high school",
        college: details?.college || "some college",
        currentCity: details?.currentCity || "Tanger",
        hometown: details?.hometown || "Morocco",
        relationship: details?.relationship || "Single",
        instagram: details?.instagram || "med_hajji7",
    };

    const [infos, setInfos] = useState(initial);
    const [showBio, setShowBio] = useState(false);
    const [max, setMax] = useState(100 - (infos.bio?.length || 0));

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBio = e.target.value;
        setInfos({ ...infos, bio: newBio });
        setMax(100 - newBio.length);
    };

    return (
        <div className={style.profile_card}>
            <div className={style.profile_card_header}>Intro</div>

            {infos.bio && !showBio && (
                <div className={style.info_col}>
                    <span className={style.info_text}>{infos.bio}</span>
                    {visitor && (
                        <button
                            className="gray_btn hover1"
                            onClick={() => setShowBio(true)}
                        >
                            Edit Bio
                        </button>
                    )}
                </div>
            )}
            {showBio && (
                <Bio
                    infos={infos}
                    max={max}
                    handleBioChange={handleBioChange}
                    setShowBio={setShowBio}
                />
            )}

            {infos.job && infos.workplace ? (
                <div className={style.info_profile}>
                    <Image src="/icons/job.png" alt="Job icon" width={24} height={24} />
                    works as {infos.job} at <b>{infos.workplace}</b>
                </div>
            ) : infos.job && !infos.workplace ? (
                <div className={style.info_profile}>
                    <Image src="/icons/job.png" alt="Job icon" width={24} height={24} />
                    works as {infos.job}
                </div>
            ) : (
                infos.workplace && (
                    <div className={style.info_profile}>
                        <Image src="/icons/job.png" alt="Workplace icon" width={24} height={24} />
                        works at {infos.workplace}
                    </div>
                )
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
            {visitor && (
                <button className="gray_btn hover1 w100">Edit Details</button>
            )}
            {visitor && (
                <button className="gray_btn hover1 w100">Add Hobbies</button>
            )}
            {visitor && (
                <button className="gray_btn hover1 w100">Add Featured</button>
            )}
        </div>
    );
};

export default Intro;
