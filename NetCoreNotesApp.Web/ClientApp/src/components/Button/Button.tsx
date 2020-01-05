import React from "react";
import "./Button.css";

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  type?: string;
  onClick?: (event: any) => void;
};

const Button = (props: ButtonProps) => {
  const { className, children } = props;

  const buttonClassName = className ? "button " + className : "button";

  return props.type == "submit" ? (
    <input
      type="submit"
      className={buttonClassName}
      value="Submit"
      onClick={props.onClick}
    />
  ) : (
    <div className={buttonClassName} onClick={props.onClick}>
      {children}
    </div>
  );
};

export default Button;
