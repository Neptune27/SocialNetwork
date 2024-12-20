﻿import styles from "@/components/post/style.module.scss";
import { api, ApiEndpoint } from "../../api/const";
import usePosts from "../../hooks/Posts/usePosts";
interface CommentBy {
    picture: string;
    name: string;
}

interface Comment {
    id: number;
    user: CommentBy;
    message: string;
    medias: string[]; // Có thể không có hình ảnh
    replys?: Comment[]
}

interface CommentProps {
    comment: Comment;
}

export default function Comment({ comment }: CommentProps) {
    const { user, message, medias, replys } = comment;

    if (user == null) {
        return(<></>)
    }
    return (
        <div className={styles.comment}>
            <img
                src={`${api(ApiEndpoint.PROFILE)}/${user.picture}`}
                alt={`${user.name}`}
                width={40}
                height={40}
                className={styles.comment_img}
            />
            <div className={styles.comment_col}>
                <div className={styles.comment_wrap}>
                    <div className={styles.comment_name}>
                        {user.name}
                        
                    </div>
                    <div className={styles.comment_text}>{message}</div>
                    {medias?.length > 0 && (
                        <img
                            src={`${api(ApiEndpoint.POST)}/${medias[0]}`}
                            alt="Attached comment image"
                            width={100}
                            height={100}
                            className={styles.comment_image}
                        />
                    )}
                </div>
                <div className={styles.comment_actions}>
                    {/*<span>Like</span>*/}
                    {/*<span>Reply</span>*/}
                    <span className={styles.comment_date}>

                        23/11/2024
                    </span>
                </div>
                {replys && replys.length > 0 && (
                    <div className={styles.comment_replies}>
                        {replys.map((reply) => (
                            <Comment comment={reply} key={reply.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
