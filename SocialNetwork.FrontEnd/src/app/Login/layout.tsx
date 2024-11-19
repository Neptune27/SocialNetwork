"use client";
import React, { useState, useEffect } from "react";
import Layout from "./page";
import Loading from "@/components/Loading";

const PageLogin: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // Clear timer when component unmounts
    }, []);

    return (
        <>
            {isLoading ? <Loading /> : <Layout />}
        </>
    );
};

export default PageLogin;
