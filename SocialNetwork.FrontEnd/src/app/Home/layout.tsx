import UserHeader from "@/components/header/header";
import LeftHome from "@/components/home/left";
import RightHome from "@/components/home/right";
import Stories from "@/components/home/stories";
import styles from "@/styles/homeLayout.module.scss";
import CreatePost from "@/components/createPost";
//import CreatePostPopUp from "./components/createPostPopUp";

const layout = () => {
  const user = {
    name: "Nguyen Huy",
    profilePicture: "/images/default_profile.png", // or a real URL
  };
  return (
    <>
      <div className={styles.home}>
        <UserHeader user={user}></UserHeader>
        <LeftHome user={user} />
        <div className={styles.home_middle}>
          <Stories />
          <CreatePost user={user} />
        </div>
        <RightHome user={user} />
      </div>
    </>
  );
};

export default layout;
