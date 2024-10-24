import React from "react";
import style from "@/components/createPostPopUp/style.module.scss";

interface PostErrorProps {
    error: string;
    setError: string;
}

const PostError = ({ error, setError }: PostErrorProps) => {
    return (
        <div className={style.postError}>
            <div>{error}</div>
            <button
                className="blue_btn"
            // onClick={() => {
            //   setError("");
            // }}
            >
                Try again
            </button>
        </div>
    );
};

export default PostError;
