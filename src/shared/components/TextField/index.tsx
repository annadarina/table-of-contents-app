import React, { HTMLProps } from "react";
import "./TextField.css";

const TextField: React.FC<HTMLProps<HTMLInputElement>> = (
  props: HTMLProps<HTMLInputElement>,
) => {
  return <input {...props} type="text" className="textfield" />;
};

export default TextField;
