"use client";
import Link from "next/link";
import React from "react";
import style from "@/styles/Login.module.scss";
import icons from "@/public/icons.module.scss";

const Footer = () => {
  return (
    <footer className={style.login_footer}>
      <div className={style.login_footer_wrap}>
        <Link href="/">English(UK)</Link>
        <Link href="/">Français(FR)</Link>
        <Link href="/">العربية</Link>
        <Link href="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
        <Link href="/">Español (España)</Link>
        <Link href="/">italiano</Link>
        <Link href="/">Deutsch</Link>
        <Link href="/">Português (Brasil)</Link>
        <Link href="/">हिन्दी</Link>
        <Link href="/">中文(简体)</Link>
        <Link href="/">日本語</Link>
        <Link href="/" className={style.footer_square}>
          <i className={icons.plus_icon}></i>
        </Link>
      </div>
      <div className={style.footer_splitter}></div>
      <div className={style.login_footer_wrap}>
        <Link href="/">Sign Up</Link>
        <Link href="/">Log in</Link>
        <Link href="/">Messenger</Link>
        <Link href="/">Facebook Lite</Link>
        <Link href="/">Watch</Link>
        <Link href="/">Places</Link>
        <Link href="/">Games</Link>
        <Link href="/">Marketplace</Link>
        <Link href="/">Facebook Pay</Link>
        <Link href="/">Oculus</Link>
        <Link href="/">Portal</Link>
        <Link href="/">Instagram</Link>
        <Link href="/">Bulletin</Link>
        <Link href="/">Local</Link>
        <Link href="/">Fundraisers</Link>
        <Link href="/">Services</Link>
        <Link href="/">Voting Information Centre</Link>
        <Link href="/">Groups</Link>
        <Link href="/">About</Link>
        <Link href="/">Create ad</Link>
        <Link href="/">Create Page</Link>
        <Link href="/">Developers</Link>
        <Link href="/">Careers</Link>
        <Link href="/">Privacy</Link>
        <Link href="/">Cookies</Link>
        <Link href="/">
          AdChoices
          <i className={icons.adChoices_icon}></i>
        </Link>
        <Link href="/">Terms</Link>
        <Link href="/">Help</Link>
      </div>
      <div className={style.login_footer_wrap}>
        <Link href="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2022
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
