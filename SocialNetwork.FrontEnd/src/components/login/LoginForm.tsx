"use client";
import React, { useState } from "react";
import style from "@/styles/Login.module.scss";
import facebookIcon from "@/public/icons/facebook.svg";
import Image from "next/image";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "@/components/inputs/loginInput";
import * as Yup from "yup";
const loginInfos = {
  email: "",
  password: "",
};

interface LoginFormProps {
  setVisible: (visible: boolean) => void; // Accept setVisible as a prop
}
const LoginForm = ({ setVisible }: LoginFormProps) => {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
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
              email,
              password,
            }}
            validationSchema={loginValidation}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
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
