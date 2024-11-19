"use client";
import style from "@/styles/Login.module.scss";
import Footer from "@/components/login/Footer";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { useState } from "react";

const Layout = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className={style.login}>
            <div className={style.login_wrapper}>
                <LoginForm setVisible={setVisible} />
                {visible && <RegisterForm setVisible={setVisible} />}
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
