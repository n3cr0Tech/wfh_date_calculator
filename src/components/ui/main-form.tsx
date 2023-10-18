"use client"
import CalculateTotalDays from "@/utils/dateCalculator";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import PTODates from "./pto-dates";


export default function MainForm() {
  const [CalculatedOutput, setCalculatedOutput] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleChange = (range: any) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
    setCalculatedOutput("");
    
  };

  const handleSubmit = (event: any) =>{
    event.preventDefault();
    const tmpFormData = {
      startDateTotal: event.target.startDateTotal.value,
      endDateTotal: event.target.endDateTotal.value
    }

    let dateDiff = CalculateTotalDays(tmpFormData.startDateTotal, tmpFormData.endDateTotal);
    let output = `There's ${dateDiff} day(s) between the start and end date (inclusive)`
    setCalculatedOutput(output);

  }

  // function debugStartDate(date: Date | null){
  //   setStartDate(date);
  //   console.log("Start Date:");
  //   console.log(date);
  // }

  return (
    <div className="max-w-6xl mx-auto px-4">       
      <div className="pt-32 pr-9 pl-9 pb-12 md:pt-25 md:pb-20 bg-slate-600 rounded-md"> 
        <div className="max-w-sm mx-auto">            
          <div className="py-5">
              <h1 className="h1" style={{color: "white"}}>Enter Date Start & End to calculate</h1>
          </div>
          <div className="pt-15">
            <form onSubmit={handleSubmit}>                                   
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>                 
                <DatePicker
                  id="startDateTotal"
                  className="text-black"
                  selectsStart
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  startDate={startDate}
                  minDate={startDate}
                />
                <span> To </span>
                <DatePicker
                  id="endDateTotal"
                  className="text-black"
                  selectsEnd
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  endDate={endDate}
                  startDate={startDate}
                  minDate={startDate}
                />    
              </div>
              
              <div className="py-5">                
                <PTODates></PTODates>
              </div>   

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                <button type="submit" className="btn rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full py-2 px-4">Calculate</button>
                </div>
              </div>
              <h2>{CalculatedOutput}</h2>
            </form>
          </div>          
        </div>        
      </div>
    </div>
  );
}