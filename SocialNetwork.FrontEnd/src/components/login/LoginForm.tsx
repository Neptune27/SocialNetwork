"use client";
import React, { useState } from "react";
import style from "@/styles/Login.module.scss";
import facebookIcon from "@/public/icons/facebook.svg";
import Image from "next/image";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "@/components/inputs/loginInput";
import * as Yup from "yup";
import { api, ApiEndpoint } from "../../api/const";

const loginInfos = {
    username: "",
    password: "",
    rememberMe: false,
};

interface LoginFormProps {
    setVisible: (visible: boolean) => void; // Accept setVisible as a prop
}

const LoginForm = ({ setVisible }: LoginFormProps) => {
    const [login, setLogin] = useState(loginInfos);
    const { username, password, rememberMe } = login;

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setLogin({ ...login, [name]: type === "checkbox" ? checked : value });
    };

    const loginValidation = Yup.object({
        username: Yup.string().required("Username is required.").max(100),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async () => {
        const result = await fetch(`${api(ApiEndpoint.IDENTITY)}/Account/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: login.username,
                password: login.password,
            }),
        });

        if (!result.ok) {
            const error = await result.text();
            console.log(error);
            alert(error);
            return;
        }

        const resultJson = await result.json();
        console.log(resultJson);

        localStorage.setItem("userId", resultJson["userId"]);

        if (login.rememberMe) {
            localStorage.setItem("token", resultJson["token"]);
        }
        else {
            sessionStorage.setItem("token", resultJson["token"])
        }

        window.location.href = "/Home"
    }

    return (
        <div className={style.login_wrap}>
            <div className={style.login_1}>
                <Image src={facebookIcon} alt="" width={300} height={300} />
                <span>
                    Facebook helps you connect and share with the people in your life.
                </span>
            </div>
            <div className={style.login_2}>
                <div className={style.login_2_wrap}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            username,
                            password,
                            rememberMe,
                        }}
                        validationSchema={loginValidation}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form>
                                <LoginInput
                                    type="text"
                                    name="username"
                                    placeholder="Email address or phone number"
                                    onChange={handleLoginChange}
                                />
                                <LoginInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleLoginChange}
                                />
                                <button type="submit" className="blue_btn">
                                    Log In
                                </button>
                                {/* Checkbox "Remember Me" below the "Log In" button */}
                                <label className={style.remember_me}>
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleLoginChange}
                                    />
                                    Remember Me
                                </label>

                            </Form>
                        )}
                    </Formik>
                    <Link href={"/forgot"} className={style.forgot_password}>
                        Forgotten password?
                    </Link>
                    <div className={style.sign_splitter}></div>
                    <button
                        className={`blue_btn ${style.open_signup}`}
                        onClick={() => setVisible(true)}
                    >
                        Create Account
                    </button>
                </div>
                <Link href="/" className="sign_extra">
                    <b>Create a Page</b> for a celebrity, brand, or business.
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
