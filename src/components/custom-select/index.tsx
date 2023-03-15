import React, { useState } from "react";
import "./style.scss";
const CustomSelect: React.FC<{
  placeholder: string;
  value?: string;
  options: { name: string; value: string }[];
  handleClick: (e?: string) => void;
}> = (props) => {
  const { options, placeholder, handleClick, value } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (o?: { name: string; value: string }) => {
    if (o) {
      handleClick(o.value);
    } else {
      handleClick();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-select">
      <div className="custom-select-selected" onClick={() => setIsOpen(!isOpen)}>
        <p className=""> {value ? options.filter((o) => o.value == value)[0].name : placeholder}</p>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11L0.937823 0.499999L13.0622 0.5L7 11Z" fill="white" />
        </svg>
      </div>
      {isOpen && (
        <div className="custom-select-select-section">
          <ul className="">
            <li className="" onClick={() => handleSelect()}>
              {placeholder}
            </li>
            {options.map((o, i) => (
              <li className="" key={i} onClick={() => handleSelect(o)}>
                {o.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
