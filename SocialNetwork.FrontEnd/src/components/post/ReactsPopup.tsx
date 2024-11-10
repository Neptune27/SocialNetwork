import Image from "next/image";
import React from "react";
import style from "@/components/post/style.module.scss";

const reactsArray = [
    {
        name: "like",
        image: "/reacts/like.gif",
    },
    {
        name: "love",
        image: "/reacts/love.gif",
    },
    {
        name: "haha",
        image: "/reacts/haha.gif",
    },
    {
        name: "wow",
        image: "/reacts/wow.gif",
    },
    {
        name: "sad",
        image: "/reacts/sad.gif",
    },
    {
        name: "angry",
        image: "/reacts/angry.gif",
    },
];

interface ReactsPopupProps {
    visible: boolean;
    setVisible: (visible: boolean) => void; // Added type for setVisible
}

const ReactsPopup = ({ visible, setVisible }: ReactsPopupProps) => {
    return (
        <>
            {visible && (
                <div
                    className={style.reacts_popup}
                    onMouseOver={() => {
                        setTimeout(() => {
                            setVisible(true);
                        }, 500);
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setVisible(false);
                        }, 500);
                    }}
                >
                    {reactsArray.map((react, i) => (
                        <div className={style.react} key={i}>
                            <Image
                                src={react.image}
                                alt={react.name}
                                width={42}
                                height={42}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ReactsPopup;
