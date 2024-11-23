import styles from "@/components/post/style.module.scss";
import Image from "next/image";
interface CommentBy {
    picture: string;
    first_name: string;
    last_name: string;
}

interface Comment {
    commentBy: CommentBy;
    comment: string;
    image?: string; // Có thể không có hình ảnh
}

interface CommentProps {
    comment: Comment;
}

export default function Comment({ comment }: CommentProps) {
    const { commentBy, commentAt, comment: content, image, replies } = comment;
    console.log(commentBy)
    return (
        <div className={styles.comment}>
            <Image
                src={commentBy.picture}
                alt={`${commentBy.first_name} ${commentBy.last_name}`}
                width={40}
                height={40}
                className={styles.comment_img}
            />
            <div className={styles.comment_col}>
                <div className={styles.comment_wrap}>
                    <div className={styles.comment_name}>
                        {commentBy.first_name} {commentBy.last_name}
                        
                    </div>
                    <div className={styles.comment_text}>{content}</div>
                    {image && (
                        <Image
                            src={image}
                            alt="Attached comment image"
                            width={100}
                            height={100}
                            className={styles.comment_image}
                        />
                    )}
                </div>
                <div className={styles.comment_actions}>
                    <span>Like</span>
                    <span>Reply</span>
                    <span className={styles.comment_date}>

                        23/11/2024
                    </span>
                </div>
                {replies && replies.length > 0 && (
                    <div className={styles.comment_replies}>
                        {replies.map((reply) => (
                            <Comment comment={reply} key={reply.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
