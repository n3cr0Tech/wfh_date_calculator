"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FormData } from "@/models/formData";
import 'react-datepicker/dist/react-datepicker.css';
import PTODates from "./pto-dates";
import GetCalculatedOutputForUser from "../workdayCalculator";
import { PTODateRange } from "@/models/ptoDateRange";


export default function MainForm() {
  const [CalculatedOutput, setCalculatedOutput] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());  
  const [ptoDates, setPTODates] = useState<PTODateRange[]>([{startDate: new Date(), endDate: new Date()}])


  const handleAddPTORow = () =>{
    let tmp = [...ptoDates];
    //create a new date, based on today (so that the new row has placeholder data to display)
    tmp.push({
      startDate: CreateNewDate(),
      endDate: CreateNewDate()
    });
    setPTODates(tmp);
  }

  const handleRemovePTORow = (index: number) =>{
    let tmp = [...ptoDates];
    tmp.splice(index, 1);
    setPTODates(tmp);
  }

  const CreateNewDate = () =>{
    let tmp = new Date();
    tmp.setHours(0,0,0,0);
    return tmp;
  }

  //if isStart==false then it's a an endDate data
  const handleChangeInPTODates = (isStart: boolean, data: Date, i: number) =>{  
    const tmpList = [...ptoDates]; 
    if(isStart){
      tmpList[i].startDate = data;
    }else{
      tmpList[i].endDate = data;
    }
        
    // tmpList[i] = data;    
    // console.log(`updating tmp endList: ${tmpList[i]}`);
    setPTODates(tmpList);    
  }

  const handleSubmit = (event: any) =>{
    event.preventDefault();
    // const tmpFormData = {
    //   startDateTotal: event.target.startDateTotal.value,
    //   endDateTotal: event.target.endDateTotal.value
    // }
    const formData = {} as FormData;    

    let tmp = startDate ? startDate : new Date();
    let copyStartDate = new Date(tmp);
    formData.startDate = copyStartDate;
    formData.attendanceRequired = event.target.attendancePercentReq.value;
    formData.weeksInWorkCycle = event.target.weeksInEachCycle.value;
    formData.ptoDates = ptoDates;
    
    console.log("!!! onSubmit formData: ");
    console.log(formData);

    let today = new Date();
    let output = GetCalculatedOutputForUser(today, formData);
    // console.log(`!!! formData.startDate: ${startDate}`);
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
              <h1 className="h1" style={{color: "white"}}>Office Attendance Calculator</h1>
          </div>
          <div className="pt-15">
            <form onSubmit={handleSubmit}>                                   
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>       
                <span>Start Date of Work Cycle: </span>          
                <DatePicker
                  id="startDateTotal"
                  className="text-black"
                  selectsStart
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  startDate={startDate}                  
                />
                <br/>
                <br/>
                <span># of weeks in work cycle: </span>          
                <input id="weeksInEachCycle" type="text" defaultValue={12} className="form-input w-full text-black" placeholder="# of Weeks in a cycle" required/>   
                <br/>
                <br/>
                <span>percent required to be in the office (e.g. '60'): </span>  
                <input id="attendancePercentReq" type="text" defaultValue={60} className="form-input w-full text-black" placeholder="Percent of Attendance required (e.g. 60)" required/>   
              </div>
              
              <div className="py-5">                
                <PTODates handlePTOAddRow={handleAddPTORow} handlePTORemoveRow={handleRemovePTORow} handlePTOUpdateRow={handleChangeInPTODates} ptoDates={ptoDates}></PTODates>
              </div>   

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                <button type="submit" className="btn rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full py-2 px-4">Calculate</button>
                </div>
              </div>
              <textarea 
                readOnly
                className="w-full py-12 text-black"
                value={CalculatedOutput}
              />              
            </form>
          </div>          
        </div>        
      </div>
    </div>
  );
}