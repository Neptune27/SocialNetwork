import Image from "next/image";
import React, { useState } from "react";
import Bio from "./Bio";
import style from "@/components/intro/style.module.scss";
import icons from "@/public/icons.module.scss";

interface DetailProps {
    img: string;
    value?: string;
    placeholder: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    updateDetails: () => void;
    infos: Record<string, any>;
    text: string;
    rel?: boolean;
}

const Detail = ({
    img,
    value,
    placeholder,
    name,
    handleChange,
    updateDetails,
    infos,
    text,
    rel,
}: DetailProps) => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className={style.add_details_flex} onClick={() => setShow(true)}>
                {value ? (
                    <div className={style.info_profile}>
                        <Image src={`/icons/${img}.png`} alt="" width={24} height={24} />
                        {value}
                        <i className={icons.edit_icon} onClick={() => setShow(!show)}></i>
                    </div>
                ) : (
                    <div onClick={() => setShow(!show)} className={style.add_detail_text}>
                        <i className={icons.rounded_plus_icon}></i>
                        <span className="underline">Add {text}</span>
                    </div>
                )}
            </div>
            {show && (
                <Bio
                    placeholder={placeholder}
                    name={name}
                    handleChange={handleChange}
                    updateDetails={updateDetails}
                    infos={infos}
                    setShow={setShow}
                    rel={rel}
                    detail
                />
            )}
        </div>
    );
};

export default Detail;
