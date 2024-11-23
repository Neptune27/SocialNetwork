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
import { api, ApiEndpoint } from "../../api/const";
import { PostProps } from "../../hooks/Posts/usePosts";
import usePopupPost from "../../hooks/Posts/usePopupPost";
import Comment from "./Comment";

//// Define the User and PostProps interfaces
//interface User {
//    name: string;
//    picture: string;
//}

//interface Comment {
//    comment: string;
//    image?: string;
//    commentBy: string;
//    commentAt: Date;
//}

//interface PostProps {
//    post: {
//        id: number;
//        user: User;
//        type: "profilePicture" | "cover" | null;
//        message?: string;
//        medias?: string[];
//        background?: string;
//        comments: Comment[];
//        createdAt: string;
//    };
//    user: {
//        name: string;
//        profilePicture: string;
//    };
//}

export default function Post({ post, user, isPopup }: PostProps) {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [commentCount, setCommentCount] = useState(5);

    const showMoreComments = () => {
 
        setCommentCount((prev) => prev + 5);
    };


    const popupStore = usePopupPost()

    const handleSeeMore = () => {
        popupStore.data.open = true
        popupStore.data.post = post
        popupStore.set(popupStore.data)
    }

    return (
        <div className={styles.post}>
            <div className={styles.post_header}>
                <Link
                    href={`/Profile?profileId=${post.user.id}`}
                    className={styles.post_header_left}
                >
                    <img
                        src={post.user.picture}
                        width={40}
                        height={40}
                    />
                    <div className={styles.header_col}>
                        <div className={styles.post_profile_name}>
                            {post.user.name}
                            <div className={styles.updated_p}>
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
                    <div className={styles.post_bg_text}>{post.message}</div>
                </div>
            ) : (post.type === null || post.type === undefined) ? (
                <>
                    {post.message && <div className={styles.post_text}>{post.message}</div>}
                    {post.medias && post.medias.length > 0 && (
                        <div
                            className={
                                post.medias.length === 1
                                    ? styles.grid_1
                                    : post.medias.length === 2
                                        ? styles.grid_2
                                        : post.medias.length === 3
                                            ? styles.grid_3
                                            : post.medias.length === 4
                                                ? styles.grid_4
                                                : styles.grid_5 
                            }
                        >
                                {post.medias.slice(0, 5).map((image, i) => (
                                    <a key={image} target="_blank" href={`${api(ApiEndpoint.POST)}/${image}`}>
                                        <img
                                            src={`${api(ApiEndpoint.POST)}/${image}`}
                                            key={i}
                                            alt=""
                                            className={styles[`img_${i}`]}
                                            width={100}
                                            height={100}
                                        />
                                </a>
                                
                            ))}
                            {post.medias.length > 5 && (
                                <div className={styles.more_pics_shadow}>
                                    +{post.medias.length - 5}
                                </div>
                            )}
                        </div>
                    )}
                </>
                ) : post.type === "profilePicture" ? (
                        <div className={styles.post_profile_wrap }>
                            <div className={styles.post_updated_bg}>
                                <Image src={"/stories/profile2.jpg"} alt="" width={700} height={100} objectFit="cover" />
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
                    <div className={styles.comments_count}>{post.comments.length} comment(s)</div>
                    {/*<div className={styles.share_count}>0</div>*/}
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
                <CreateComment user={user} postId={post.id} />
                {!isPopup &&
                    <div className="flex justify-end">
                        <span onClick={handleSeeMore}>See more</span>
                    </div>
                }
                {/*<CreateComment user={user} />*/}
                {post.comments.slice(0, commentCount).map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
                {isPopup && commentCount < post.comments.length && (
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
