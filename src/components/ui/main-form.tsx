"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


export default function MainForm() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (range: any) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  function debugStartDate(date: Date | null){
    setStartDate(date);
    console.log("Start Date:");
    console.log(date);
  }

  return (
    <div>      
       <div>
        <DatePicker
            selectsStart
            selected={startDate}
            onChange={date => debugStartDate(date)}
            startDate={startDate}
        />
        <DatePicker
            selectsEnd
            selected={endDate}
            onChange={date => setEndDate(date)}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
        />
    </div>
    </div>
  );
}