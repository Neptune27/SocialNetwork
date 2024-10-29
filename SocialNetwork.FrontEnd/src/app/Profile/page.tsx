"use client";
import React, { useState } from "react";
import UserHeader from "@/components/header/header";
import style from "@/styles/Profile.module.scss";
import icons from "@/public/icons.module.scss";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "@/components/createPost";
import GridPosts from "./GridPosts";
import CreatePostPopUp from "@/components/createPostPopUp";
import Post from "@/components/post";
import Photos from "./Photos";
import Link from "next/link";
import Friends from "./Friends";
import Intro from "../../components/intro";

const visitor = false; //Visitor or not

interface UserProps {
  name: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface Comment {
  comment: string;
  commentBy: string;
  commentAt: Date;
}

interface PostUser {
  username: string;
  picture: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
}

interface PostData {
  user: PostUser;
  type: "profilePicture" | "cover" | null;
  text: string;
  images: string[];
  background?: string; // Optional
  comments: Comment[];
  createdAt: string;
}

// Mock user data
const user: UserProps = {
  name: "Nguyen Huy",
  firstName: "Nguyen",
  lastName: "Huy",
  profilePicture: "/images/default_profile.png",
};

// Mock post data matching the Mongoose schema
const postVar: PostData = {
  user: {
    username: "johndoe",
    picture: "/images/default_profile.png",
    first_name: "John",
    last_name: "Doe",
    gender: "male",
  },
  type: "profilePicture",
  text: "This is a mock post description with multiple images.",
  images: ["/stories/1.jpg", "/stories/3.jpg"],
  background: "/images/postBackgrounds/1.jpg",
  comments: [
    {
      comment: "Great post!",
      commentBy: "user1",
      commentAt: new Date(),
    },
  ],
  createdAt: new Date().toISOString(),
};
const postVar1: PostData = {
  user: {
    username: "johndoe",
    picture: "/images/default_profile.png",
    first_name: "John",
    last_name: "Doe",
    gender: "male",
  },
  type: "profilePicture",
  text: "This is a mock post description with multiple images.",
  images: ["/stories/1.jpg", "/stories/3.jpg"],
  comments: [
    {
      comment: "Great post!",
      commentBy: "user1",
      commentAt: new Date(),
    },
  ],
  createdAt: new Date().toISOString(),
};
const details = {
    bio: "A passionate software developer",
    othername: "Huy",
    job: "Software Engineer",
    workplace: "Tech Corp",
    highSchool: "Nguyen Huu Canh High",
    college: "Sai Gon University",
    currentCity: "Ho Chi Minh",
    hometown: "Quang Nam",
    relationship: "Single",
    instagram: "NguyenHuy",
};

const ProfilePage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && <CreatePostPopUp user={user} setVisible={setVisible} />}
      <div className={style.profile}>
        <UserHeader user={user} page="profile" />
        <div className={style.profile_top}>
          <div className={style.profile_container}>
            <Cover cover={"/images/postBackgrounds/1.jpg"} visitor />
            <ProfilePictureInfos
              profile={{
                picture: user.profilePicture,
                first_name: user.firstName,
                last_name: user.lastName,
              }}
              visitor
            />
            <ProfileMenu />
          </div>
        </div>
        <div className={style.profile_bottom}>
          <div className={style.profile_container}>
            <div className={style.bottom_container}>
              <PplYouMayKnow />
              <div className={style.profile_grid}>
                              <div className={style.profile_left}>
                                  <Intro details={details} visitor />
                  <Photos />
                  <Friends />
                  <div className={style.relative_fb_copyright}>
                    <Link href="/">Privacy </Link>
                    <span>. </span>
                    <Link href="/">Terms </Link>
                    <span>. </span>
                    <Link href="/">Advertising </Link>
                    <span>. </span>
                    <Link href="/">
                      Ad Choices <i className={icons.ad_choices_icon}></i>{" "}
                    </Link>
                    <span>. </span>
                    <Link href="/"></Link>Cookies <span>. </span>
                    <Link href="/">More </Link>
                    <span>. </span> <br />
                    Meta © 2022
                  </div>
                </div>
                <div className={style.profile_right}>
                  {!visitor && (
                    <CreatePost user={user} profile setVisible={setVisible} />
                  )}
                  <GridPosts />
                  <div className={style.posts}>
                    {/* <div className={style.no_posts}>No posts available</div> */}
                    <Post post={postVar} user={user} key={1} />
                    <Post post={postVar1} user={user} key={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
