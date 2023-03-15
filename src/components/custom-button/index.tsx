import React from "react";
import "./style.scss";
const CustomButton: React.FC<{
  title: string;
  onClick: () => void;
}> = (props) => {
  const { title, onClick } = props;
  return (
    <button className="custom-button" onClick={onClick}>
      {title}
    </button>
  );
};

export default CustomButton;
