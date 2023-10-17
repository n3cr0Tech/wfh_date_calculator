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
    <div className="max-w-6xl mx-auto px-4 sm:px-6">       
      <div className="pt-32 pr-9 pl-9 pb-12 md:pt-15 md:pb-20 bg-slate-600"> 
        <div className="max-w-sm mx-auto">            
          <div style={{padding:"5px 50px"}}>
              <h1 className="h1" style={{color: "white"}}>Enter Date Start & End to calculate</h1>
          </div>                       
            <form>         
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              <h3> Start </h3>
              <DatePicker
                className="text-black"
                selectsStart
                selected={startDate}
                onChange={date => debugStartDate(date)}
                startDate={startDate}
              />
              <h3> To </h3>
              <DatePicker
                className="text-black"
                selectsEnd
                selected={endDate}
                onChange={date => setEndDate(date)}
                endDate={endDate}
                startDate={startDate}
                minDate={startDate}
              />    
            </form>
          </div>
        </div>
      </div>
  );
}