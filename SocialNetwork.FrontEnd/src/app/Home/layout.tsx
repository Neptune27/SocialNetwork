"use client";
import React, { useState, useEffect } from "react";
import Layout from "./page";
import Loading from "@/components/Loading";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);

    //useEffect(() => {
    //    const timer = setTimeout(() => {
    //        setIsLoading(false);
    //    }, 3000); // 3000 milliseconds = 3 seconds

    //    return () => clearTimeout(timer); // Xóa bộ hẹn giờ khi component bị unmount
    //}, []);

    return (
        <>
            {isLoading ? <Loading /> : <Layout />}
        </>
    );
};

export default Page;
