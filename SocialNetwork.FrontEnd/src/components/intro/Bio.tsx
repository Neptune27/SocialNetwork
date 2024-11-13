import React from "react";
import style from "@/components/intro/style.module.scss";
import icons from "@/public/icons.module.scss";

interface BioProps {
    infos: Record<string, any>;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    max: number;
    setShowBio?: (show: boolean) => void;
    updateDetails: (nameInfo:string, value:string) => void;
    placeholder: string;
    name: string;
    detail?: boolean;
    setShow?: (show: boolean) => void;
    rel?: boolean;
}

const Bio = ({
    infos = {},
    handleChange,
    max = 100,
    setShowBio,
    updateDetails,
    placeholder,
    name,
    detail = false,
    setShow,
    rel = false,
}: BioProps) => {
    const remainingChars = max - (infos[name]?.length || 0);
    console.log(infos)
    const handleSave = () => {
        const value = infos[name]
        console.log("Click handle save")
        updateDetails(name, value);
        setShow?.(false);
    };
    return (
        <div className={style.add_bio_wrap}>
            {rel ? (
                <select
                    className={style.select_rel }
                    name={name}
                    value={infos.relationship || ""}
                    onChange={handleChange}
                >
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a relationship</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                </select>
            ) : (
                <textarea
                    placeholder={placeholder}
                    name={name}
                    value={infos[name] || ""}
                    maxLength={100}
                    className={`${style.textarea_blue} ${style.details_input}`}
                    onChange={handleChange}
                ></textarea>
            )}

            {!detail && <div className={style.remaining }>{remainingChars} characters remaining</div>}

            <div className={style.flex}>
                <div className={`${style.flex} ${style.flex_left}`}>
                    <i className={icons.public_icon}></i>Public
                </div>
                <div className={`${style.flex} ${style.flex_right}`}>
                    <button
                        className="gray_btn"
                        onClick={() => (detail ? setShow?.(false) : setShowBio?.(false))}
                    >
                        Cancel
                    </button>
                    <button className="blue_btn" onClick={() => { handleSave()}}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bio;
