import { PTODateRange } from "@/models/ptoDateRange";
import React, { useState } from "react";

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function PTODates(props: {handlePTOAddRow: () => void,
                                            handlePTORemoveRow: (i: number) => void,
                                            handlePTOUpdateRow: (isStart: boolean, data: Date, i: number) => void,
                                            ptoDates: PTODateRange[]}){

    const handlePTOAdd = () => {                
        props.handlePTOAddRow();
    };

    const handlePTORemove = (index:number) => {
        props.handlePTORemoveRow(index);
    }

    const handleStartDateElementOnChange = (date: Date|null, index: number) =>{      
        let nullSafeguard = date ? date : new Date();        
        props.handlePTOUpdateRow(true, nullSafeguard, index);     
    }

    const handleEndDateElementOnChange = (date: Date|null, index: number) =>{
        let nullSafeguard = date ? date : new Date();          
        props.handlePTOUpdateRow(false, nullSafeguard, index);     
    }

    return(
        <div>
            <span>PTO Dates:</span>
            {
                props.ptoDates.map((e, i) =>(
                    <div key={`pto_${i}`}>
                         <DatePicker
                            name={`ptoStart_${i}`} 
                            className="text-black"                            
                            selected={e.startDate}
                            onChange={(date) => handleStartDateElementOnChange(date,i)}
                            endDate={props.ptoDates[i].startDate}
                            startDate={e.startDate}
                            minDate={e.startDate}
                        /> 
                        <span> To </span>
                        <DatePicker
                            name={`ptoEnd_${i}`} 
                            className="text-black"
                            selectsEnd
                            selected={e.endDate}
                            onChange={(date) => handleEndDateElementOnChange(date, i)}
                            endDate={e.endDate}
                            startDate={e.endDate}
                            minDate={e.startDate}
                        />                         
                        {props.ptoDates.length > 1 && (
                            <button type="button" id="remove-btn" className="btn flex-row rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2"
                                onClick={() => handlePTORemove(i)}>
                                <span>Remove</span>
                            </button>
                        )}
                        {props.ptoDates.length - 1 === i && props.ptoDates.length < 10 && (
                            <button type="button" id="add-btn" className="btn flex space-x-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2"
                            onClick={handlePTOAdd}
                            >
                            <span>Add</span>
                            </button>
                        )}
                    </div>
                ))
            }
        </div>

    );
}