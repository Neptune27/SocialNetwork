import React from "react";
import style from "@/styles/Profile.module.scss";
import Image from "next/image";

interface AddFriendSmallCardProps {
  item: {
    profile_picture: string;
    profile_name: string;
  };
}

const AddFriendSmallCard = ({ item }: AddFriendSmallCardProps) => {
  return (
    <div className={style.addfriendCard}>
      <div className={style.addfriend_imgsmall}>
        <Image src={item.profile_picture} alt="" width={50} height={50} />
        <div className={style.addfriend_infos}>
          <div className={style.addfriend_name}>
            {item.profile_name.length > 11
              ? `${item.profile_name.substring(0, 11)}...`
              : item.profile_name}
          </div>
          <div className={style.light_blue_btn}>
            <Image
              src="/icons/addFriend.png"
              alt="Add Friend"
              className={"filter_blue"}
              width={20}
              height={20}
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
