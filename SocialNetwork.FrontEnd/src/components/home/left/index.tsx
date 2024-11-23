"use client";
import { useState } from "react";
import styles from "@/styles/leftHome.module.scss";
import Link from "next/link";
import Image from "next/image";
import { left } from "@/data/home";
import LeftLink from "./LeftLink";
import { ArrowDown1 } from "@/public/svg";
import Shortcut from "./Shortcut";
import avatar from "@/public/images/default_profile.png";
import youtb from "@/public/images/ytb.png";
import ins from "@/public/images/insta.png";

interface UserHeaderProps {
  user: {
    name: string;
    profilePicture: string;
  };
}
const LeftHome = ({ user }: UserHeaderProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`${styles.left_home} scrollbar`}>
      <Link href={"Profile"} className={`${styles.left_link} hover1`}>
              <img
                  src={user.profilePicture}
          alt="Avatar"
          width="40"
          height="40"
        />
        <span>{user?.name}</span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification || ""}
        />
      ))}
      {!visible && (
        <div
          className={`${styles.left_link} hover1`}
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification || ""}
            />
          ))}
          <div
            className={`${styles.left_link} hover1`}
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className={`small_circle ${styles.rotate360}`}>
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className={styles.splitter}></div>
      <div className={styles.shortcut}>
        <div className={styles.heading}>Your Shortcuts</div>
        <div className={styles.edit_shortcut}>Edit</div>
      </div>
      <div className={styles.shortcut_list}>
        <Shortcut
          link="https://www.youtube.com/c/MohamedHaJJi1/featured"
          img={youtb}
          name="My Youtube channel"
        />

        <Shortcut
          link="https://www.instagram.com/med_hajji7/"
          img={ins}
          name="My Instagram "
        />
      </div>
      <div
        className={`${styles.fb_copyright} ${
          visible && styles.relative_fb_copyright
        }`}
      >
        <Link href="/">Privacy </Link>
        <span>. </span>
        <Link href="/">Terms </Link>
        <span>. </span>
        <Link href="/">Advertising </Link>
        <span>. </span>
        <Link href="/">
          Ad Choices <i className={styles.ad_choices_icon}></i>{" "}
        </Link>
        <span>. </span>
        <Link href="/"></Link>Cookies <span>. </span>
        <Link href="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  );
};

export default LeftHome;
