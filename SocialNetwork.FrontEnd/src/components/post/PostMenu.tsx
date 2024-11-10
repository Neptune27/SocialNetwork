import React, { useRef, useState } from "react";
import useOnClickOutside from "@/helper/useClickOutside";
import MenuItem from "./MenuItem";
import style from "@/components/post/style.module.scss";

interface PostMenuProps {
    postUserId: string; // ID of the user who created the post
    userId: string; // ID of the current user
    imagesLength: number; // Number of images in the post
    setShowMenu: (show: boolean) => void; // Function to toggle the menu
}

const PostMenu = ({
    postUserId,
    userId,
    imagesLength,
    setShowMenu,
}: PostMenuProps) => {
    const [isPostOwner, setIsPostOwner] = useState(postUserId === userId);
    const menuRef = useRef<HTMLUListElement>(null);

    useOnClickOutside(menuRef, () => setShowMenu(false));

    return (
        <ul className={style.post_menu} ref={menuRef}>
            {isPostOwner && <MenuItem icon="pin_icon" title="Pin Post" />}
            <MenuItem
                icon="save_icon"
                title="Save Post"
                subtitle="Add this to your saved items."
            />
            <div className="line"></div>
            {isPostOwner && <MenuItem icon="edit_icon" title="Edit Post" />}
            {!isPostOwner && (
                <MenuItem
                    icon="turnOnNotification_icon"
                    title="Turn on notifications for this post"
                />
            )}
            {imagesLength > 0 && <MenuItem icon="download_icon" title="Download" />}
            {imagesLength > 0 && (
                <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
            )}
            {isPostOwner && <MenuItem img="/icons/lock.png" title="Edit audience" />}
            {isPostOwner && (
                <MenuItem
                    icon="turnOffNotifications_icon"
                    title="Turn off notifications for this post"
                />
            )}
            {isPostOwner && (
                <MenuItem icon="delete_icon" title="Turn off translations" />
            )}
            {isPostOwner && <MenuItem icon="date_icon" title="Edit Date" />}
            {isPostOwner && (
                <MenuItem icon="refresh_icon" title="Refresh share attachment" />
            )}
            {isPostOwner && <MenuItem icon="archive_icon" title="Move to archive" />}
            {isPostOwner && (
                <MenuItem
                    icon="trash_icon"
                    title="Move to trash"
                    subtitle="Items in your trash are deleted after 30 days."
                />
            )}
            {!isPostOwner && <div className="line"></div>}
            {!isPostOwner && (
                <MenuItem
                    img="/icons/report.png"
                    title="Report post"
                    subtitle="I'm concerned about this post."
                />
            )}
        </ul>
    );
};

export default PostMenu;
