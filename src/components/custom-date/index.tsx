import React, { useState } from "react";
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import CalendarIcon from "../../assets/icons/Calendar.svg";
import DatePicker from "react-datepicker";
const CustomDate: React.FC<{
  placeholder: string;
}> = ({ placeholder }) => {
  const [startDate, setStartDate] = useState<Date>();
  const CustomDateInput = React.forwardRef<HTMLDivElement>(({ value, onClick }: any, ref) => (
    <div className="custom-date" onClick={onClick} ref={ref}>
      <p className="">{value || placeholder}</p>
      <img src={CalendarIcon} alt="" />
    </div>
  ));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date || new Date())}
      customInput={<CustomDateInput />}
      minDate={new Date()}
      maxDate={new Date()}
    />
  );
};

export default CustomDate;
