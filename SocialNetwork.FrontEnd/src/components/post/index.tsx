"use client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Dots, Public } from "@/public/svg"; // Adjust icon imports if needed
import styles from "@/components/post/style.module.scss";
import icons from "@/public/icons.module.scss";
import Image from "next/image";
import ReactsPopup from "./ReactsPopup";
import { useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import Comment from "./Comment";


// Define the User and PostProps interfaces
interface User {
    username: string;
    picture: string;
    first_name: string;
    last_name: string;
    gender: "male" | "female";
}

interface Comment {
    id: string;
    comment: string;
    image?: string;
    commentBy: User;
    commentAt: Date;
    likes?: number;
    replies?: Comment[];
}

interface PostProps {
    post: {
        user: User;
        type: "profilePicture" | "cover" | null;
        text?: string;
        images?: string[];
        background?: string;
        comments: Comment[];
        createdAt: string;
    };
    user: User; 
}

export default function Post({ post, user }: PostProps) {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [commentCount, setCommentCount] = useState(5);

    const showMoreComments = () => {
        setCommentCount((prev) => prev + 5);
    };

    return (
        <div className={styles.post}>
            <div className={styles.post_header}>
                <Link
                    href={`/profile/${post.user.username}`}
                    className={styles.post_header_left}
                >
                    <Image
                        src={post.user.picture}
                        alt={`${post.user.first_name} ${post.user.last_name}`}
                        width={40}
                        height={40}
                    />
                    <div className={styles.header_col}>
                        <div className={styles.post_profile_name}>
                            {post.user.first_name} {post.user.last_name}
                            <div className={styles.updated_p}>
                                {post.type === "profilePicture" &&
                                    `updated ${post.user.gender === "male" ? "his" : "her"
                                    } profile picture`}
                                {post.type === "cover" &&
                                    `updated ${post.user.gender === "male" ? "his" : "her"
                                    } cover picture`}
                            </div>
                        </div>
                        <div className={styles.post_profile_privacy_date}>
                            {formatDistanceToNow(new Date(post.createdAt), {
                                addSuffix: true,
                            })}
                            . <Public color="#828387" />
                        </div>
                    </div>
                </Link>
                <div
                    className={`${styles.post_header_right} hover1`}
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    <Dots color="#828387" />
                </div>
            </div>
            {post.background ? (
                <div
                    className={styles.post_bg}
                    style={{ backgroundImage: `url(${post.background})` }}
                >
                    <div className={styles.post_bg_text}>{post.text}</div>
                </div>
            ) : post.type === null ? (
                <>
                    {post.text && <div className={styles.post_text}>{post.text}</div>}
                    {post.images && post.images.length > 0 && (
                        <div
                            className={
                                post.images.length === 1
                                    ? styles.grid_1
                                    : post.images.length === 2
                                        ? styles.grid_2
                                        : post.images.length === 3
                                            ? styles.grid_3
                                            : post.images.length === 4
                                                ? styles.grid_4
                                                : styles.grid_5 
                            }
                        >
                            {post.images.slice(0, 5).map((image, i) => (
                                <Image
                                    src={image}
                                    key={i}
                                    alt=""
                                    className={styles[`img_${i}`]}
                                    width={100}
                                    height={100}
                                />
                            ))}
                            {post.images.length > 5 && (
                                <div className={styles.more_pics_shadow}>
                                    +{post.images.length - 5}
                                </div>
                            )}
                        </div>
                    )}
                </>
                ) : post.type === "profilePicture" ? (
                        <div className={styles.post_profile_wrap }>
                            <div className={styles.post_updated_bg}>
                                <Image src={"/stories/profile2.jpg"} alt="" width={100} height={300} />
                            </div>
                            <Image src={"/stories/1.jpg"} alt="" width={100} height={105} className={styles.post_updated_picture} />
                         
                    </div>
                ) : (
                    <div className="post_cover_wrap"></div>
                ) }
            {/*  */}
            <div className={styles.post_infos}>
                <div className={styles.reacts_count}>
                    <div className={styles.reacts_count_imgs}></div>
                    <div className={styles.reacts_count_num}></div>
                </div>
                <div className={styles.to_right}>
                    <div className={styles.comments_count}>13 comments</div>
                    <div className={styles.share_count}>1 share</div>
                </div>
            </div>
            <div className={styles.post_actions}>
                <ReactsPopup visible={visible} setVisible={setVisible} />
                <div
                    className={`${styles.post_action} hover1`}
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
                    <i className={icons.like_icon}></i>
                    <span>Like</span>
                </div>
                <div className={`${styles.post_action} hover1`}>
                    <i className={icons.comment_icon}></i>
                    <span>Comment</span>
                </div>
                <div className={`${styles.post_action} hover1`}>
                    <i className={icons.share_icon}></i>
                    <span>Share</span>
                </div>
            </div>
            <div className={styles.comments_wrap}>
                <div className={styles.comments_order}></div>
                <CreateComment user={user} />
                {post.comments.slice(0, commentCount).map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
                {commentCount < post.comments.length && (
                    <div className="view_comments" onClick={showMoreComments}>
                        View more comments
                    </div>
                )}
            </div>
            {showMenu && (
                <PostMenu
                    userId={"1"}
                    postUserId={"1"}
                    imagesLength={5}
                    setShowMenu={setShowMenu}
                />
            )}
        </div>
    );
}
