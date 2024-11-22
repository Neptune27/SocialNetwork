import { create } from "zustand";

export interface User {
    name: string;
    picture: string;
}


export interface Comment {
    comment: string;
    image?: string;
    commentBy: string;
    commentAt: Date;
}

export interface PostProps {
    post: {
        id: number;
        user: User;
        type: "profilePicture" | "cover" | null;
        message?: string;
        medias?: string[];
        background?: string;
        comments: Comment[];
        createdAt: string;
    };
    user: PostUser
}

export interface PostUser {
    username: string;
    picture: string;
}


export interface PostData {
    id: number,
    user: PostUser;
    type: "profilePicture" | "cover" | null;
    message: string;
    medias: string[];
    background?: string; // Optional
    comments: Comment[];
    createdAt: string;
}

export interface PostStore {
    posts: PostData[];
    remove: () => void;
    set: (posts: PostData[]) => void
}


const usePosts = create<PostStore>((set) => ({
    posts: [],
    remove: () => {
        set({
            posts: []
        })
    },
    set: (newPosts) => set({
        posts: [...newPosts]
    })
}))

export default usePosts