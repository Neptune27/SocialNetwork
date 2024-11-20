"use client";
import React, { useState, useEffect } from "react";
import ProfilePage from "./page";
import Loading from "@/components/Loading";

const Layout: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    //useEffect(() => {
    //    const timer = setTimeout(() => {
    //        setIsLoading(false);
    //    }, 3000); // 3000 milliseconds = 3 seconds

    //    return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị unmount
    //}, []);

    return (
        <>
            {isLoading ? <Loading /> : <ProfilePage />}
        </>
    );
};

export default Layout;
