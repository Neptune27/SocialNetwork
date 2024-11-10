import React from "react";
import style from "@/styles/Profile.module.scss";
import Image from "next/image";

const Photos = () => {
  return (
    <div className={style.profile_card}>
      <div className={style.profile_card_header}>
        Photos
        <div className={style.profile_header_link}>See all photos</div>
      </div>
      <div className={style.profile_card_count}>{`9 photos`}</div>
      <div className={style.profile_card_grid}>
        <div className={style.profile_photo_card} key={1}>
          <Image src={"/stories/1.jpg"} alt="" width={100} height={105} />
        </div>
        <div className={style.profile_photo_card} key={2}>
          <Image src={"/stories/2.png"} alt="" width={100} height={105} />
        </div>
        <div className={style.profile_photo_card} key={3}>
          <Image src={"/stories/3.jpg"} alt="" width={20} height={105} />
        </div>
        <div className={style.profile_photo_card} key={4}>
          <Image src={"/stories/4.jpg"} alt="" width={20} height={105} />
        </div>
        <div className={style.profile_photo_card} key={5}>
          <Image src={"/stories/5.jfif"} alt="" width={20} height={105} />
        </div>
      </div>
    </div>
  );
};

export default Photos;
