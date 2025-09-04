import React from "react";

const Input = ({
  type,
  className,
  placeholder,
  accept,
  id,
  onChange,
  bgColor,
  pattern,
  autoComplete,
  ...props
}) => {

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder ? placeholder : ""}
      pattern={pattern ? pattern :null}
      autoComplete={autoComplete ? autoComplete : ""}
      accept={type === "file" ? accept : ""}
      onChange={onChange ? onChange : null}
      className={`${className} ${
        bgColor ? bgColor : "bg-gray-100"
      } rounded-lg h-9 px-2`}
      {...props}
    />
  );
};

export default Input;
