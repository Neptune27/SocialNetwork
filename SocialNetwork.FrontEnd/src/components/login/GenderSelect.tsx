import { useMediaQuery } from "react-responsive";
import style from "@/styles/Login.module.scss";
interface GenderSelectProps {
  handleRegisterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  genderError: string | null; // Assuming genderError holds an error message or null if there's no error
}

export default function GenderSelect({
  handleRegisterChange,
  genderError,
}: GenderSelectProps) {
  const view1 = useMediaQuery({ query: "(min-width: 539px)" });
  const view2 = useMediaQuery({ query: "(min-width: 850px)" });
  const view3 = useMediaQuery({ query: "(min-width: 1170px)" });

  return (
    <div
      className={style.reg_grid}
      style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
    >
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleRegisterChange}
        />
      </label>
      {genderError && (
        <div
          className={
            !view3
              ? `${style.input_error}`
              : `${style.input_error} ${style.input_error_select_large}`
          }
        >
          <div
            className={
              !view3
                ? `${style.error_arrow_bottom}`
                : `${style.error_arrow_left}`
            }
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
