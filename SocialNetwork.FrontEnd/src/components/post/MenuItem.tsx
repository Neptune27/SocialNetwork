import Image from "next/image";
import React from "react";
import style from "@/components/post/style.module.scss";
import icons from "@/public/icons.module.scss";

interface MenuItemProps {
    icon?: string; // Optional icon class from the icons module
    title: string; // Required title for the menu item
    subtitle?: string; // Optional subtitle
    img?: string; // Optional image path
}

const MenuItem = ({ icon, title, subtitle, img }: MenuItemProps) => {
    return (
        <div>
            <li className="hover1">
                {img ? (
                    <Image src={img} alt={title} width={30} height={30} />
                ) : (
                    <i className={icons[icon || "icon"]}></i> // If no img, display the icon
                )}
                <div className={style.post_menu_text}>
                    <span>{title}</span>
                    {subtitle && <span className={style.menu_post_col}>{subtitle}</span>}
                </div>
            </li>
        </div>
    );
};

export default MenuItem;
