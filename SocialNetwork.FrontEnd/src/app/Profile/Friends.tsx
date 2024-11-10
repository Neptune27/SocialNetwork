import React from "react";
import style from "@/styles/Profile.module.scss";

const Friends = () => {
  return (
    <div className={style.profile_card}>
      <div className={style.profile_card_header}>
        Friends
        <div className={style.profile_header_link}>See all friends</div>
      </div>
      {<div className={style.profile_card_count}>5 friends</div>}
      <div className={style.profile_card_grid}>
        <div className={style.profile_photo_card}></div>
      </div>
    </div>
  );
};

export default Friends;
