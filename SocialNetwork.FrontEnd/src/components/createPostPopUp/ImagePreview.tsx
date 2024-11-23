import React, { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import style from "@/components/createPostPopUp/style.module.scss";
import icons from "@/public/icons.module.scss"; // Icons styles need to be defined correctly in this file
import Image from "next/image";
import { FileType } from "../../interfaces/IFileType";
import { CgFilm } from "react-icons/cg";

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
    files: FileType[];
    setFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
    setShowPrev: (value: boolean) => void; // Fix: should be a boolean setter
    setError: (value: string) => void;
}

const ImagePreview = ({
    text,
    user,
    setText,
    showPrev,
    files,
    setFiles,
    setShowPrev,
    setError,
}: ImagePreviewProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newFiles : FileType[]= files.map((file) => {
            let url = ""
            if (file.type.startsWith("image")) {
                url = URL.createObjectURL(file)
            }

            return ({
                changedName: file.name,
                progress: 0,
                source: file,
                blobUrl: url
            })


            //const reader = new FileReader();
            //reader.readAsDataURL(img);
            //reader.onload = (readerEvent) => {
            //    const result = readerEvent.target?.result as string;
            //    if (result) {
            //        setFiles((prevImages) => [...prevImages, result]);
            //        console.log("Image added:", result); // Debugging line
            //    }
            //};
        });

        console.log(newFiles); // Debugging line

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

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
                {files && files.length > 0 ? (
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
                                setFiles([]);
                            }}
                        >
                            <i className={icons.exit_icon}></i>
                        </div>
                        <div
                            className={
                                files.length < 6
                                    ? style[`preview${files.length}`]
                                    : files.length % 2 === 0
                                        ? style.preview6
                                        : `${style.preview6} ${style.singular_grid}`
                            }
                        >
                            {files.map((file, i) => (
                                file.blobUrl == ""
                                    ? <div key={file.source.name} className="w-full flex justify-center p-6">
                                        <CgFilm size={125} />
                                    </div>
                                    : <img key={file.source.name}   
                                        src={file.blobUrl}
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
                        </div>
                    </div>
                )}
                {/*<div className={style.add_pics_inside2}>*/}
                {/*    <div className={style.add_circle}>*/}
                {/*        <i className={icons.phone_icon}></i>*/}
                {/*    </div>*/}
                {/*    <div className={style.mobile_text}>*/}
                {/*        Add photos from your mobile device.*/}
                {/*    </div>*/}
                {/*    <span className={style.addphone_btn}>Add</span>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ImagePreview;
