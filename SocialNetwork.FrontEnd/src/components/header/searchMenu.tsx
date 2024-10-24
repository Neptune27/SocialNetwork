"use client";
import React, { useEffect, useRef, useState } from "react";
import { Return, Search } from "@/app/public/svg";
import styles from "@/styles/header.module.scss";
import useClickOutside from "@/helper/useClickOutside";

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

    useClickOutside(menu, () => {
        setShowSearchMenu(false);
    });
    useEffect(() => {
        input.current?.focus();
    }, []);
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

                    <input
                        type="text"
                        placeholder="Search Facebook"
                        ref={input}

                        onFocus={() => {
                            setIconVisible(false);
                        }}
                        onBlur={() => {
                            setIconVisible(true);
                        }}
                    />
                </div>
            </div>
            <div className={styles.search_history_header}>
                <span>Recent searches</span>
            </div>
            <div className={styles.search_history}></div>
            <div className={`${styles.search_results} scrollbar`}></div>
        </div>
    );
};

export default SearchMenu;
