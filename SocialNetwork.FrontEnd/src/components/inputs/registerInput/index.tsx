import React from "react";
import style from "@/components/inputs/registerInput/style.module.scss";
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";
import icons from "@/public/icons.module.scss";

interface RegisterInputProps {
  placeholder: string;
  type?: string;
  name: string;
  bottom?: boolean;
  [key: string]: any;
}

const RegisterInput: React.FC<RegisterInputProps> = ({
  placeholder,
  type = "text",
  bottom = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const test1 = view3 && field.name === "first_name";
  const test2 = view3 && field.name === "last_name";

  return (
    <div className={`${style.input_wrap} ${style.register_input_wrap}`}>
      <input
        className={
          meta.touched && meta.error ? `${style.input_error_border}` : ""
        }
        style={{
          width: `${
            view1 && (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view1 && (field.name === "email" || field.name === "password" || field.name === "username")
              ? "370px"
              : "300px"
          }`,
        }}
        type={type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <div
          className={
            view3
              ? `${style.input_error} ${style.input_error_desktop}`
              : `${style.input_error}`
          }
          style={{
            transform: "translateY(2px)",
            left: `${test1 ? "-107%" : test2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                view3 && field.name !== "last_name"
                  ? style.error_arrow_left
                  : view3 && field.name === "last_name"
                  ? style.error_arrow_right
                  : !view3 && style.error_arrow_bottom
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && <i className={icons.error_icon}></i>}
    </div>
  );
};

export default RegisterInput;
