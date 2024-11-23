"use client";
import { useEffect, useRef, useState } from "react";
import Picker, { EmojiClickData } from "emoji-picker-react";
import Image from "next/image";
import style from "@/components/post/style.module.scss";
import icons from "@/public/icons.module.scss";
import { api, ApiEndpoint } from "../../api/const";
import { FileType } from "../../interfaces/IFileType";
import { IoMdArrowRoundForward } from "react-icons/io";
import useToken from "../../hooks/useToken";
import usePosts from "../../hooks/Posts/usePosts";
import axios from "axios";

interface CreateCommentProps {
    user: {
        profilePicture: string;
    };
    postId: number
}

const CreateComment = ({ user, postId }: CreateCommentProps) => {
    const [picker, setPicker] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [commentImage, setCommentImage] = useState<FileType | null>();
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);
    const textRef = useRef<HTMLInputElement>(null);
    const imgInput = useRef<HTMLInputElement>(null);
    const postStore = usePosts()


    useEffect(() => {
        if (textRef.current && cursorPosition !== null) {
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

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (
            file.type !== "image/jpeg" &&
            file.type !== "image/png" &&
            file.type !== "image/webp" &&
            file.type !== "image/gif"
        ) {
            setError(`${file.name} format is not supported.`);
            return;
        } 

        const fileType: FileType = {
            changedName: file.name,
            progress: 0,
            source: file,
            blobUrl: URL.createObjectURL(file)
        } 

        setCommentImage(fileType);
    };


    const handleSentComment = async () => {
        const formData = new FormData();
        formData.append("message", text)
        formData.append("files", commentImage?.source)
        formData.append("postId", `${postId}`)
        const token = useToken()


        const resp = await axios.post(`${api(ApiEndpoint.POST)}/Comment`, formData, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        if (resp.status == 200) {
            const data = await resp.data
            const post = postStore.posts.find(p => p.id == postId)
            if (post == null) {
                console.error("Huh?")
                return
            }

            post.comments.unshift(data)

            postStore.set(postStore.posts)


        }


    }

    return (
        <div className={style.create_comment_wrap}>
            <div className={style.create_comment}>
                <img
                    src={`${user?.profilePicture}`}
                    alt="User profile picture"
                    width={35}
                    height={35}
                />
                <div className={style.comment_input_wrap}>
                    {picker && (
                        <div className={style.comment_emoji_picker}>
                            <Picker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                    <input
                        type="file"
                        hidden
                        ref={imgInput}
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleImage}
                    />
                    {error && (
                        <div className={`${style.postError} ${style.comment_error}`}>
                            <div className={style.postError_error}>{error}</div>
                            <button className="blue_btn" onClick={() => setError("")}>
                                Try again
                            </button>
                        </div>
                    )}
                    <input
                        type="text"
                        ref={textRef}
                        value={text}
                        placeholder="Write a comment..."
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div
                        className={`${style.comment_circle_icon} hover2`}
                        onClick={() => setPicker((prev) => !prev)}
                    >
                        <i className={icons.emoji_icon}></i>
                    </div>
                    <div
                        className={`${style.comment_circle_icon} hover2`}
                        onClick={() => imgInput.current?.click()}
                    >
                        <i className={icons.camera_icon}></i>
                    </div>
                    <div className={`${style.comment_circle_icon} hover2`}>
                        <i className={icons.gif_icon}></i>
                    </div>
                    <div className={`${style.comment_circle_icon} hover2`} onClick={handleSentComment}>
                        <IoMdArrowRoundForward />
                    </div>
                </div>
            </div>
            {commentImage && (
                <div className={style.comment_img_preview}>
                    <img
                        src={commentImage.blobUrl}
                        alt="Comment image"
                        width={150}
                        height={150}
                    />
                    <div
                        className={`${style.small_white_circle} absolute top-0 right-0`}
                        onClick={() => setCommentImage(null)}
                    >
                        <i className={icons.exit_icon}></i>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateComment;
