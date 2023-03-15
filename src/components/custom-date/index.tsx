import React, { useState } from "react";
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/icons/Calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
const CustomDate: React.FC<{
  placeholder: string;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (d: Date) => void;
}> = ({ placeholder, value, minDate = moment("2021/01/01").toDate(), maxDate = moment("2021/12/31").toDate(), onChange }) => {
  const CustomDateInput = React.forwardRef<HTMLDivElement>(({ value, onClick }: any, ref) => (
    <div className="custom-date-picker" onClick={onClick} ref={ref}>
      <p className="">{value || placeholder}</p>
      <img src={CalendarIcon} alt="" />
    </div>
  ));

  return (
    <div className="custom-date">
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date || minDate)}
        customInput={<CustomDateInput />}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default CustomDate;
