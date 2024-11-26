"use client";
import React from "react";
import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import style from "@/styles/Login.module.scss";
import icons from "@/public/icons.module.scss";
import * as Yup from "yup";
import GenderSelect from "./GenderSelect";
import DateOfBirthSelect from "./DateOfBirthSelect";
import { api, ApiEndpoint } from "../../api/const";

interface RegisterFormProps {
    setVisible: (visible: boolean) => void;
}

const ForgotPassForm = ({ setVisible }: RegisterFormProps) => {
    const userInfos = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        bYear: new Date().getFullYear(),
        bMonth: new Date().getMonth() + 1,
        bDay: new Date().getDate(),
        gender: "",
    };
    const [user, setUser] = useState(userInfos);
    const {
        username,
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
    } = user;
    const yearTemp = new Date().getFullYear();
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const years = Array.from(new Array(108), (val, index) => yearTemp - index);

    const months = Array.from(new Array(12), (val, index) => 1 + index);
    const getDays = () => {
        return new Date(bYear, bMonth, 0).getDate();
    };
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
    console.log(user);

    const registerValidation = Yup.object({
        username: Yup.string()
            .required("What's your Username")
            .min(4, "Username must be between 4 and 16 characters.")
            .max(16, "Username must be between 4 and 16 characters.")
        ,
        first_name: Yup.string()
            .required("What's your First name ?")
            .min(2, "Fisrt name must be between 2 and 16 characters.")
            .max(16, "Fisrt name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
        last_name: Yup.string()
            .required("What's your Last name ?")
            .min(2, "Last name must be between 2 and 16 characters.")
            .max(16, "Last name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
        email: Yup.string()
            .required(
                "You'll need this when you log in and if you ever need to reset your password."
            )
            .email("Enter a valid email address."),
        password: Yup.string()
            .required(
                "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
    });
    const [dateError, setDateError] = useState("");
    const [genderError, setGenderError] = useState("");

    const handleSubmit = async () => {
        const current_date = new Date().getTime();
        const picked_date = new Date(bYear, bMonth - 1, bDay).getTime();
        const atleast14 = new Date(1970 + 14, 0, 1).getTime();
        const noMoreThan70 = new Date(1970 + 70, 0, 1).getTime();
        if (current_date - picked_date < atleast14) {
            setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
            );
            return
        }

        if (current_date - picked_date > noMoreThan70) {
            setDateError(
                "it looks like you(ve enetered the wrong info. Please make sure that you use your real date of birth."
            );
            return
        }

        if (gender === "") {
            setDateError("");
            setGenderError(
                "Please choose a gender. You can change who can see this later."
            );
            return

        }

        setDateError("");
        setGenderError("");
        await handleRegister();

    }

    const handleRegister = async () => {
        const birthday = new Date(user.bYear, user.bMonth, user.bDay)

        const data = {
            username: user.username,
            email: user.email,
            password: user.password,
            firstname: user.first_name,
            lastname: user.last_name,
            birthday: birthday.toISOString().slice(0, 10),
            gender: user.gender
        }

        const resp = await fetch(`${api(ApiEndpoint.IDENTITY)}/Account/Register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (resp.status !== 200) {
            const text = await resp.text();
            console.error(text);
            return
        }

        const json = await resp.json()
        localStorage.setItem("token", json["token"]);

        window.location.href = "/Home"

        console.log(json);

    }

    return (
        <div className={style.blur_background}>
            <div className={style.register}>
                <div className={style.register_header}>
                    <i className={icons.exit_icon} onClick={() => setVisible(false)}></i>
                    <span>Sign Up</span>
                    <span>it is quick and easy</span>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        username,
                        first_name,
                        last_name,
                        email,
                        password,
                        bYear,
                        bMonth,
                        bDay,
                        gender,
                    }}
                    validationSchema={registerValidation}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <Form className={style.register_form}>

                            <div className={style.reg_line}>
                                <RegisterInput
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className={style.reg_line}>
                                <RegisterInput
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    onChange={handleRegisterChange}
                                />
                                <RegisterInput
                                    type="text"
                                    placeholder="Surname"
                                    name="last_name"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className={style.reg_line}>
                                <RegisterInput
                                    type="text"
                                    placeholder="Email address"
                                    name="email"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className={style.reg_line}>
                                <RegisterInput
                                    type="password"
                                    placeholder="New password"
                                    name="password"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className={style.reg_col}>
                                <div className={style.reg_line_header}>
                                    Date of birth <i className={icons.info_icon}></i>
                                </div>
                                <DateOfBirthSelect
                                    bDay={bDay}
                                    bMonth={bMonth}
                                    bYear={bYear}
                                    days={days}
                                    months={months}
                                    years={years}
                                    handleRegisterChange={handleRegisterChange}
                                    dateError={dateError}
                                />
                            </div>
                            <div className={style.reg_col}>
                                <div className={style.reg_line_header}>
                                    Gender <i className={icons.info_icon}></i>
                                </div>
                                <GenderSelect
                                    handleRegisterChange={handleRegisterChange}
                                    genderError={genderError}
                                />
                            </div>
                            <div className={style.reg_infos}>
                                By clicking Sign Up, you agree to our{" "}
                                <span>Terms, Data Policy &nbsp;</span>
                                and <span>Cookie Policy.</span> You may receive SMS
                                notifications from us and can opt out at any time.
                            </div>
                            <div className={style.reg_btn_wrapper}>
                                <button
                                    type="submit"
                                    className={`${style.open_signup} blue_btn`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassForm;
