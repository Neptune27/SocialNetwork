import React from "react";
import styles from "@/styles/header.module.scss";
import icons from "@/public/icons.module.scss";

interface SettingPrivacyProps {
  setVisible: (visible: number) => void;
}

const SettingPrivacy = ({ setVisible }: SettingPrivacyProps) => {
  return (
    <div className={styles.absolute_wrap}>
      <div className={styles.absolute_wrap_header}>
        <div
          className={`${styles.circle} hover1`}
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className={icons.faArrowLeft}></i>
        </div>
        Settings & privacy
      </div>
      <div className={`${styles.mmenu_item} hover3`}>
        <div className="small_circle">
          <i className="privacy_checkup_icon"></i>
        </div>
        <span>Settings</span>
      </div>
    </div>
  );
};

export default SettingPrivacy;
