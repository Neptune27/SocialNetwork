"use client";
import styles from "@/styles/header.module.scss";
import Link from "next/link";
import {
    ArrowDown,
    Friends,
    Gaming,
    Home,
    HomeActive,
    Logo,
    Market,
    Menu,
    Messenger,
    Notifications,
    Search,
    Watch,
} from "@/app/public/svg";
import { useRef, useState } from "react";
import SearchMenu from "./searchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "@/helper/useClickOutside";
import UserMenu from "./userMenu";
//import avatar from "@/public/images/default_profile.png";

interface UserHeaderProps {
    user: {
        name: string;
        profilePicture: string;
    };
    page: string;
}
const UserHeader = ({ user, page }: UserHeaderProps) => {
    // const { user } = useSelector((user) => ({ ...user }));
    const color = "#65676b";
    const [showSearchMenu, setShowSearchMenu] = useState(false);
    const [showAllMenu, setShowAllMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const allmenu = useRef(null);
    const usermenu = useRef(null);
    useClickOutside(allmenu, () => {
        setShowAllMenu(false);
    });
    useClickOutside(usermenu, () => {
        setShowUserMenu(false);
    });
    return (
        <header className={styles.header}>
            <div className={styles.header_left}>
                <Link href={"/Home"} className={styles.header_logo}>
                    <div className={styles.circle}>
                        <Logo />
                    </div>
                </Link>
                <div
                    className={`${styles.search} ${styles.search1}`}
                    onClick={() => setShowSearchMenu(true)}
                >
                    <Search color={color} />
                    <input
                        type="text"
                        placeholder="Search Facebook"
                        className={styles.hide}
                    />
                </div>
            </div>
            {showSearchMenu && (
                <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
            )}

            <div className={styles.header_middle}>
                <Link
                    href="/Home"
                    className={`${styles.middle_icon} ${page === "home" ? "active" : ""}`}
                >
                    {page === "home" ? <HomeActive /> : <Home color={color} />}
                </Link>
                <Link href="/Home" className={`${styles.middle_icon} hover1 `}>
                    <Friends color={color} />
                </Link>
                <Link href="/Home" className={`${styles.middle_icon} hover1`}>
                    <Watch color={color} />
                    <div className={styles.middle_notification}>9+</div>
                </Link>
                <Link href="/Home" className={`${styles.middle_icon} hover1`}>
                    <Market color={color} />
                </Link>
                <Link href="/Home" className={`${styles.middle_icon} hover1`}>
                    <Gaming color={color} />
                </Link>
            </div>
            <div className={styles.header_right}>
                <Link
                    href="/Profile"
                    className={`${styles.profile_link} hover1 ${page === "profile" ? `${styles.active_link}` : ""
                        }`}
                >
                    <img src={`${user.profilePicture}`} alt="Avatar" width="40" height="40" />
                    <span>{user.name}</span>
                </Link>
                <div
                    className={`${styles.circle_icon} hover1`}
                    ref={allmenu}
                    onClick={() => {
                        setShowAllMenu((prev) => !prev);
                    }}
                >
                    <Menu />
                    {showAllMenu && <AllMenu />}
                </div>
                <Link href="/Chat" className={`${styles.circle_icon} hover1`}>
                    <Messenger />
                </Link>
                <div className={`${styles.circle_icon} hover1`}>
                    <Notifications />
                    <div className={`${styles.right_notification} `}>5</div>
                </div>
                <div className={`${styles.circle_icon} hover1`} ref={usermenu}>
                    <div
                        onClick={() => {
                            setShowUserMenu((prev) => !prev);
                        }}
                    >
                        <ArrowDown color={"black"} />
                    </div>
                    {showUserMenu && <UserMenu user={user} />}
                </div>
            </div>
        </header>
    );
};

export default UserHeader;
