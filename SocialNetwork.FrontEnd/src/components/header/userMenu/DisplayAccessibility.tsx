import React from "react";
import styles from "@/styles/header.module.scss";

interface SettingPrivacyProps {
  setVisible: (visible: number) => void;
}

const DisplayAccessibility = ({ setVisible }: SettingPrivacyProps) => {
  return (
    <div className={styles.absolute_wrap}>
      <div className={styles.absolute_wrap_header}>
        <div
          className={`${styles.circle} hover1`}
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Help & Support
      </div>
      <div className={`${styles.mmenu_item} ${styles.hover3}`}>
        <div className="small_circle">
        <i className="help_center_icon"></i>
        </div>
        <span>Help Center</span>
      </div>
      <div className={`${styles.mmenu_item} ${styles.hover3}`}>
        <div className="small_circle">
        <i className="email_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>
      <div className={`${styles.mmenu_item} ${styles.hover3}`}>
        <div className="small_circle">
        <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>
    </div>
  );
};

export default DisplayAccessibility;
