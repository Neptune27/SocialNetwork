import { useMediaQuery } from "react-responsive";
import style from "@/styles/Login.module.scss";

interface DateOfBirthSelectProps {
  bDay: number;
  bMonth: number;
  bYear: number;
  days: number[];
  months: number[];
  years: number[];
  handleRegisterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dateError: string | null;
}

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
}: DateOfBirthSelectProps) {
  const view1 = useMediaQuery({ query: "(min-width: 539px)" });
  const view2 = useMediaQuery({ query: "(min-width: 850px)" });
  const view3 = useMediaQuery({ query: "(min-width: 1170px)" });

  return (
    <div
      className={style.reg_grid}
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
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
          {dateError}
        </div>
      )}
    </div>
  );
}
