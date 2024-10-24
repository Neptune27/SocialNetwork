import React from "react";
import icons from "@/public/icons.module.scss";
import style from "@/styles/Profile.module.scss";

const GridPosts = () => {
  return (
    <div className={style.createPost}>
      <div
        className={style.createPost_header}
        style={{ justifyContent: "space-between" }}
      >
        <div className={style.left_header_grid}>Posts</div>
        <div className={style.flex}>
          <div className="gray_btn">
            <i className={icons.equalize_icon}></i>
          </div>
          <div className="gray_btn">
            <i className={icons.manage_icon}></i>
            Manage Posts
          </div>
        </div>
      </div>
      <div className={style.create_splitter}></div>
      <div className={`${style.createPost_body} ${style.grid2}`}>
        <div className={`${style.view_type} ${style.active}`}>
          <i className={`${icons.list_icon} filter_blue`}></i>
          List view
        </div>
        <div className={style.view_type}>
          <i className={icons.grid_icon}></i>
          Grid view
        </div>
      </div>
    </div>
  );
};

export default GridPosts;
