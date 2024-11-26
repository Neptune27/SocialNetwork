import React, { useState } from "react";
import styles from "@/styles/header.module.scss";
import Link from "next/link";
import Image from "next/image";
import SettingPrivacy from "./SettingPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
interface UserMenuProps {
    user: {
      name: string;
      profilePicture: string;
    };
  }
  
  const UserMenu = ({ user }: UserMenuProps) => {
    const [visible, setVisible] = useState(0);
    return (
      <div className={styles.mmenu}>
        {visible === 0 && (
          <div>
            <Link href={"/profile"} className={`${styles.mmenu_header} hover3`}>
              <img
                src={user?.profilePicture}
                alt="Avatar"
                width="60"
                height="60"
              />
              <div className={styles.mmenu_col}>
                <span>{user?.name}</span>
              </div>
            </Link>
            <div className={styles.mmenu_splitter}></div>
            <div className={`${styles.mmenu_main} hover3`}>
              <div className={styles.small_circle}>
               <i className="report_filled_icon"></i>
              </div>
              <div className={styles.mmenu_col}>
                <div className={styles.mmenu_span1}>Give feedback</div>
                <div className={styles.mmenu_span2}>Help us improve Facebook</div>
              </div>
            </div>
            <div className={styles.mmenu_splitter}></div>
            <div
              className={`${styles.mmenu_main} hover3`}
              onClick={() => {
                setVisible(1);
              }}
            >
              <div className={styles.small_circle}>
               <i className="settings_filled_icon"></i>
              </div>
              <span>Settings & privacy</span>
              <div className={styles.rArrow}>
               <i className="right_icon"></i>
              </div>
            </div>
            <div className={styles.mmenu_splitter}></div>
            <div
              className={`${styles.mmenu_main} hover3`}
              onClick={() => {
                setVisible(2);
              }}
            >
              <div className={styles.small_circle}>
              <i className="help_filled_icon"></i>
              </div>
              <span>Help & support</span>
              <div className={styles.rArrow}>
              <i className="right_icon"></i>
              </div>
            </div>
            <div className={styles.mmenu_splitter}></div>
            <div
              className={`${styles.mmenu_main} ${styles.hover3}`}
              onClick={() => {
                setVisible(3);
              }}
            >
              <div className={styles.small_circle}>
              <i className="dark_filled_icon"></i>
              </div>
              <span>Display & Accessibility</span>
              <div className={styles.rArrow}>
              <i className="right_icon"></i>
              </div>
            </div>
            <div className={`${styles.mmenu_main} hover3`}>
              <div className={styles.small_circle}>
              <i className="logout_filled_icon"></i>
                        </div>
                        <a href="/Logout">Logout</a>
            </div>
          </div>
        )}
        {visible === 1 && <SettingPrivacy setVisible={setVisible} />}
        {visible === 3 && <HelpSupport setVisible={setVisible} />}
        {visible === 2 && <DisplayAccessibility setVisible={setVisible} />}
      </div>
    );
  };
  
  export default UserMenu;
  