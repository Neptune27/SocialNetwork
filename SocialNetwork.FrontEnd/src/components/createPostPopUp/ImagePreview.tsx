import React, { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import style from "@/components/createPostPopUp/style.module.scss";
import icons from "@/public/icons.module.scss"; // Icons styles need to be defined correctly in this file
import Image from "next/image";

interface ImagePreviewProps {
    text: string;
    user: {
        name: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
    };
    setText: (value: string) => void;
    showPrev: boolean;
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
    setShowPrev: (value: boolean) => void; // Fix: should be a boolean setter
    setError: (value: string) => void;
}

const ImagePreview = ({
    text,
    user,
    setText,
    showPrev,
    images,
    setImages,
    setShowPrev,
    setError,
}: ImagePreviewProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        console.log("Files uploaded:", files); // Debugging line
        files.forEach((img) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (readerEvent) => {
                const result = readerEvent.target?.result as string;
                if (result) {
                    setImages((prevImages) => [...prevImages, result]);
                    console.log("Image added:", result); // Debugging line
                }
            };
        });
    };

    return (
        <div className={style.overflow_a}>
            <EmojiPickerBackground
                text={text}
                user={user}
                setText={setText}
                showPrev={showPrev}
            />
            <div className={style.add_pics_wrap}>
                <input
                    type="file"
                    multiple
                    hidden
                    ref={imageInputRef}
                    onChange={handleImages}
                />
                {images && images.length > 0 ? (
                    <div className={`${style.add_pics_inside1} ${style.p0}`}>
                        <div className={style.preview_actions}>
                            <button className="hover1">
                                <i className={icons.edit_icon}></i>
                                Edit
                            </button>
                            <button
                                className="hover1"
                                onClick={() => imageInputRef.current?.click()}
                            >
                                <i className={icons.addPhoto_icon}></i>
                                Add Photos/Videos
                            </button>
                        </div>
                        <div
                            className={style.small_white_circle}
                            onClick={() => {
                                setImages([]);
                            }}
                        >
                            <i className={icons.exit_icon}></i>
                        </div>
                        <div
                            className={
                                images.length === 1
                                    ? style.preview1
                                    : images.length === 2
                                        ? style.preview2
                                        : images.length === 3
                                            ? style.preview3
                                            : images.length === 4
                                                ? style.preview4
                                                : images.length === 5
                                                    ? style.preview5
                                                    : images.length % 2 === 0
                                                        ? style.preview6
                                                        : `${style.preview6} ${style.singular_grid}`
                            }
                        >
                            {images.map((img, i) => (
                                <Image
                                    src={img}
                                    key={i}
                                    alt={`preview-${i}`}
                                    width={300}
                                    height={300}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={style.add_pics_inside1}>
                        <div
                            className={style.small_white_circle}
                            onClick={() => {
                                setShowPrev(false);
                            }}
                        >
                            <i className={icons.exit_icon}></i>
                        </div>
                        <div
                            className={style.add_col}
                            onClick={() => {
                                imageInputRef.current?.click();
                            }}
                        >
                            <div className={style.add_circle}>
                                <i className={icons.addPhoto_icon}></i>
                            </div>
                            <span>Add Photos/Videos</span>
                            <span>or drag and drop</span>
                        </div>
                    </div>
                )}
                <div className={style.add_pics_inside2}>
                    <div className={style.add_circle}>
                        <i className={icons.phone_icon}></i>
                    </div>
                    <div className={style.mobile_text}>
                        Add photos from your mobile device.
                    </div>
                    <span className={style.addphone_btn}>Add</span>
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
