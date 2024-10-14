import React from "react";
import style from "@/components/inputs/loginInput/style.module.scss";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

interface LoginInputProps {
  placeholder: string;
  type?: string; // type có thể không bắt buộc và mặc định là "text"
  name: string;
  bottom?: boolean; // Thêm prop bottom, mặc định là false
  [key: string]: any; // Chấp nhận các props khác từ Formik như value, onChange, etc.
}

const LoginInput: React.FC<LoginInputProps> = ({
  placeholder,
  type = "text",
  bottom = false, // Giá trị mặc định cho bottom
  ...props
}) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });
  return (
    <div className={style.input_wrap}>
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView
              ? `${style.input_error} ${style.input_error_desktop}`
              : style.input_error
          }
          style={{ transform: "translateY(3px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              desktopView ? style.error_arrow_left : style.error_arrow_top
            }
          ></div>
        </div>
      )}
      <input
        className={meta.touched && meta.error ? style.input_error_border : ""}
        type={type} // Đảm bảo truyền vào hoặc mặc định là "text"
        name={field.name} // Sử dụng name từ field của Formik
        placeholder={placeholder}
        {...field}
        {...props} // Truyền các props còn lại (không có name)
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView
              ? `${style.input_error} ${style.input_error_desktop}`
              : style.input_error
          }
          style={{ transform: "translateY(2px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              desktopView ? style.error_arrow_left : style.error_arrow_top
            }
          ></div>
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className={style.error_icon}
          style={{ top: !bottom && desktopView ? "63%" : "15px" }}
        ></i>
      )}
    </div>
  );
};

export default LoginInput;
