"use client";
import React, { useEffect, useRef, useState } from "react";
import { Return, Search } from "@/app/public/svg";
import styles from "@/styles/header.module.scss";
import useClickOutside from "@/helper/useClickOutside";
import { useRouter } from "next/navigation";
import { authorizedFetch } from "../../Ultility/authorizedFetcher";
import { api, ApiEndpoint } from "../../api/const";
import { PostUser, User } from "../../hooks/Posts/usePosts";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface SearchMenuProps {
    color: string;
    setShowSearchMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchMenu = ({ color, setShowSearchMenu }: SearchMenuProps) => {
    const [iconVisible, setIconVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const menu = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);
    const router = useRouter()

    useClickOutside(menu, () => {
        setShowSearchMenu(false);
    });
    useEffect(() => {
        input.current?.focus();
    }, []);

    const [searchText, setSearchText] = useState("")
    const [searchUsers, setSearchUsers] = useState<PostUser[]>([])

    const handleSearchUser = async (value: string) => {
        const resp = await authorizedFetch(`${api(ApiEndpoint.PROFILE)}/Profile/Name/${value}`)
        const data = await resp.json()
        setSearchUsers(data)
        console.log(data)
    }

    const handleSearchTextChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setSearchText(text)
        if (text.length < 3) {
            return
        }
        await handleSearchUser(text)
        
        
    }
    return (
        <div
            className={`${styles.scrollbar} ${styles.header_left} ${styles.search_area}`}
            ref={menu} // Add ref to the main container
        >
            <div className={`${styles.search_wrap} `}>
                <div className={styles.header_logo}>
                    <div
                        className={`${styles.circle} hover1`}
                        onClick={() => {
                            setShowSearchMenu(false);
                        }}
                    >
                        <Return color={color} />
                    </div>
                </div>
                <div
                    className={styles.search}
                    onClick={() => {
                        input.current?.focus();
                    }}
                >
                    {iconVisible && (
                        <div>
                            <Search color={color} />
                        </div>
                    )}
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const value = input.current?.value
                        router.push(`/Search?q=${value}`)
                        
                    }}>
                        <input
                            type="text"
                            placeholder="Search"
                            ref={input}
                            onChange={handleSearchTextChange}
                            onFocus={() => {
                                setIconVisible(false);
                            }}
                            onBlur={() => {
                                setIconVisible(true);
                            }}
                        />
                    </form>
                    
                </div>
            </div>
            <div className={`${styles.search_history_header} flex-col `}>
                <span>Users</span>
                <div className="flex flex-col gap-2 w-full">
                    {searchUsers.map(u => <a key={ u.id} href={`/Profile?profileId=${u.id}`} className="unset flex gap-2 ">
                        <Avatar>
                            <AvatarImage src={u.picture} />
                            <AvatarFallback className="bg-gray-500 h-10 w-10 p-2 pl-3">{u.userName[0]}</AvatarFallback>
                        </Avatar>
                        <span>{u.userName}</span>
                    </a>)}
                </div>
            </div>
            {/*<div className={styles.search_history}>*/}

            {/*</div>*/}
            <div className={`${styles.search_results} scrollbar`}></div>
        </div>
    );
};

export default SearchMenu;
