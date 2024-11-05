import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page } = req.query;
    const pageSize = 10; // Số lượng bài post mỗi trang
    const totalPosts = 100; // Tổng số bài post giả lập

    // Chuyển đổi page thành số nguyên và kiểm tra nếu hợp lệ
    const pageNumber = parseInt(page as string, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
        return res.status(400).json({ error: 'Invalid page number' });
    }

    const posts = Array.from({ length: pageSize }, (_, index) => ({
        id: (pageNumber - 1) * pageSize + index + 1,
        title: `Bài viết ${(pageNumber - 1) * pageSize + index + 1}`,
        content: `Nội dung của bài viết ${(pageNumber - 1) * pageSize + index + 1}`,
    }));

    res.status(200).json({
        posts,
        hasMore: pageNumber * pageSize < totalPosts, // Kiểm tra xem còn dữ liệu không
    });
}
