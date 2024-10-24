import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import style from "@/components/createPostPopUp/style.module.scss";
import icons from "@/public/icons.module.scss";
import { EmojiClickData } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface EmojiPickerBackgroundProps {
    text: string;
    user: {
        name: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
    setText: (value: string) => void;
    showPrev: boolean;
    background?: string;
    setBackground?: (value: string) => void;
}

const EmojiPickerBackground = ({
    text,
    user,
    setText,
    showPrev,
    background,
    setBackground,
}: EmojiPickerBackgroundProps) => {
    const [picker, setPicker] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<number | undefined>();
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);
    const [showBgs, setShowBgs] = useState(false);

    useEffect(() => {
        if (textRef.current && cursorPosition !== undefined) {
            textRef.current.selectionEnd = cursorPosition;
        }
    }, [cursorPosition]);

    const handleEmoji = (emojiData: EmojiClickData) => {
        const ref = textRef.current;
        const emoji = emojiData.emoji;
        if (ref) {
            ref.focus();
            const start = text.substring(0, ref.selectionStart || 0);
            const end = text.substring(ref.selectionStart || 0);
            const newText = start + emoji + end;
            setText(newText);
            setCursorPosition(start.length + emoji.length);
        }
    };

    const postBackgrounds = [
        "/images/postbackgrounds/1.jpg",
        "/images/postbackgrounds/2.jpg",
        "/images/postbackgrounds/3.jpg",
        "/images/postbackgrounds/4.jpg",
        "/images/postbackgrounds/5.jpg",
        "/images/postbackgrounds/6.jpg",
        "/images/postbackgrounds/7.jpg",
        "/images/postbackgrounds/8.jpg",
        "/images/postbackgrounds/9.jpg",
    ];

    const backgroundHandler = (index: number) => {
        if (bgRef.current && textRef.current) {
            bgRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
            textRef.current.style.backgroundImage = "transparent";
            setBackground?.(postBackgrounds[index]);
            bgRef.current.classList.add(style.bgHandler);
        }
    };

    const removeBackground = () => {
        if (bgRef.current) {
            bgRef.current.style.backgroundImage = "";
            setBackground?.("");
            bgRef.current.classList.remove(style.bgHandler);
        }
    };

    return (
        <div className={style.image_input}>
            {/* Text Input Area */}
            <div className={style.flex_center} ref={bgRef}>
                <textarea
                    ref={textRef}
                    maxLength={100}
                    value={text}
                    placeholder={`What's on your mind, ${user.firstName}?`}
                    className={`${style.post_input} ${showPrev ? style.input2 : ""}`}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        paddingTop: background ? "32%" : "0",
                    }}
                ></textarea>
            </div>

            {/* Emoji Picker and Background Selection */}
            <div className={style.post_emojis_wrap}>
                {picker && (
                    <div
                        className={`${style.comment_emoji_picker} ${showPrev ? style.movepicker2 : style.rlmove
                            }`}
                    >
                        <EmojiPicker onEmojiClick={handleEmoji} />
                    </div>
                )}

                {!showPrev && (
                    <Image
                        src="/icons/colorful.png"
                        alt="Background Selector Icon"
                        onClick={() => {
                            setShowBgs((prev) => !prev);
                        }}
                        width={50}
                        height={50}
                    />
                )}

                {!showPrev && showBgs && (
                    <div className={style.post_backgrounds}>
                        <div className={style.no_bg} onClick={removeBackground}></div>
                        {postBackgrounds.map((bg, i) => (
                            <Image
                                src={bg}
                                key={i}
                                alt={`Background ${i + 1}`}
                                onClick={() => backgroundHandler(i)}
                                width={50}
                                height={50}
                            />
                        ))}
                    </div>
                )}

                <i
                    className={`${icons.emoji_icon_large} ${showPrev ? style.moveleft : ""
                        }`}
                    onClick={() => setPicker((prev) => !prev)}
                ></i>
            </div>
        </div>
    );
};

export default EmojiPickerBackground;
