import React from "react";
import styles from "@/styles/header.module.scss";

interface SettingPrivacyProps {
  setVisible: (visible: number) => void;
}

const HelpSupport = ({ setVisible }: SettingPrivacyProps) => {
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
        Display & Accessibility
      </div>
      <div className={styles.mmenu_main}>
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className={styles.mmenu_col}>
          <span className={styles.mmenu_span1}>Dark Mode</span>
          <span className={styles.mmenu_span2}>
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkOff" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
      <div className={styles.mmenu_main}>
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className={styles.mmenu_col}>
          <span className={styles.mmenu_span1}>Compact mode</span>
          <span className={styles.mmenu_span2}>
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      <div className={`${styles.mmenu_item} hover3`}>
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className={styles.rArrow}>
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
