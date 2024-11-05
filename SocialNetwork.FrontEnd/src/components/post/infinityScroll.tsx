"use clients"
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Post {
    id: number;
    title: string;
    content: string;
}



const InfinityScroll = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    // Hàm tải thêm bài viết
    const fetchPosts = async () => {
        try {
            const res = await fetch(`/api/post?page=${page}`);
            const data = await res.json();

            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
            setHasMore(data.hasMore); // Cập nhật trạng thái hasMore
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Lỗi khi tải bài viết:", error);
        }
    };

    useEffect(() => {
        fetchPosts(); // Tải dữ liệu lần đầu
    }, []);

    return (
        <InfiniteScroll
            dataLength={posts.length} // Số lượng bài viết hiện tại
            next={fetchPosts} // Hàm gọi khi cuộn tới cuối
            hasMore={hasMore} // Xác định có còn dữ liệu không
            loader={<p>Đang tải thêm...</p>}
            endMessage={<p>Đã tải hết tất cả bài viết!</p>}
        >
            {posts.map((post) => (
                <div key={post.id} style={{ borderBottom: "1px solid #ddd", padding: "16px" }}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </InfiniteScroll>
    );
};

export default InfinityScroll;
