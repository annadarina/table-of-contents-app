import { HTMLProps } from "react";
import "./TextField.css";

const TextField = (props: HTMLProps<HTMLInputElement>) => {
  return <input {...props} type="text" className="textfield" />;
};

export default TextField;
