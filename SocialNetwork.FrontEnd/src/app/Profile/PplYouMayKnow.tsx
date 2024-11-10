import React from "react";
import style from "@/styles/Profile.module.scss";
import { Dots } from "@/public/svg";
import { stories } from "@/data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";

const PplYouMayKnow = () => {
  return (
    <div className={style.pplumayknow}>
      <div className={style.pplumayknow_header}>
        People You May Know
        <div className={`${style.post_header_right} ppl_circle hover1`}>
          <Dots color={"#000"} />
        </div>
      </div>
      <div className={style.pplumayknow_list}>
        {stories.map((item, i) => (
          <AddFriendSmallCard
            key={i}
            item={{
              profile_picture: item.profile_picture.src, // Use the src
              profile_name: item.profile_name,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PplYouMayKnow;
