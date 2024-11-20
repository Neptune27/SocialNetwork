"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Post from "@/components/post";

interface PostData {
    user: {
        username: string;
        picture: string;
        first_name: string;
        last_name: string;
        gender: string;
    };
    type: string;
    text: string;
    images: string[];
    background: string;
    comments: {
        comment: string;
        commentBy: string;
        commentAt: Date;
    }[];
    createdAt: string;
}

function LoadMore() {
    const [posts, setPosts] = useState<PostData[]>([]); // Danh sách bài viết
    const { ref, inView } = useInView(); // Hook để phát hiện khi người dùng cuộn tới phần tử cuối

    // Hàm mô phỏng để tải thêm bài viết
    const loadMorePosts = () => {
        const newPost: PostData = {
            user: {
                username: "johndoe",
                picture: "/images/default_profile.png",
                first_name: "John",
                last_name: "Doe",
                gender: "male",
            },
            type: "profilePicture",
            text: "This is a mock post description with multiple images.",
            images: ["/stories/1.jpg", "/stories/3.jpg"],
            background: "/images/postBackgrounds/1.jpg",
            comments: [
                {
                    comment: "Great post!",
                    commentBy: "user1",
                    commentAt: new Date(),
                },
            ],
            createdAt: new Date().toISOString(),
        };

        setPosts((prevPosts) => [...prevPosts, newPost]); // Thêm bài viết mới vào danh sách
    };

    // Gọi hàm loadMorePosts khi inView là true
    useEffect(() => {
        if (inView) {
            loadMorePosts();
        }
    }, [inView]);

    return (
        <div>
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                    user={post.user}
                />
            ))}
            <div ref={ref} style={{ height: "1px" }} /> {/* Phần tử dùng để kích hoạt load */}
        </div>
    );
}

export default LoadMore;
