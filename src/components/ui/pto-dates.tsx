import React, { useState } from "react";

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function PTODates(){
    const [startDateList, setStartDateList] = useState<Date[]>([new Date()]);
    const [endDateList, setEndDateList] = useState<Date[]>([new Date()]);

    console.log(startDateList);

    const handlePTOAdd = () => {
        setStartDateList([...startDateList, new Date()]);
        setEndDateList([...endDateList, new Date()]);
    };

    const handlePTORemove = (index:number) => {
        const startList = [...startDateList];
        const endList = [...endDateList];
        startList.splice(index, 1);
        endList.splice(index, 1);
        setStartDateList(startList);
        setEndDateList(endDateList);
    }

    const handleStartDateElementOnChange = (date: Date|null, index: number) =>{                
        const list = [...startDateList];
        list[index] = date;
        setStartDateList(list);
    }

    const handleEndDateElementOnChange = (date: Date|null, index: number) =>{
        const list = [...endDateList];
        list[index] = date;
        setEndDateList(list);
    }

    return(
        <div>
            <span>PTO Date</span>
            {
                startDateList.map((e, i) =>(
                    <div key={`pto_${i}`}>
                         <DatePicker
                            name={`ptoStart_${i}`} 
                            className="text-black"
                            selectsEnd
                            selected={startDateList[i]}
                            onChange={(date) => handleStartDateElementOnChange(date,i)}
                            endDate={endDateList[i]}
                            startDate={startDateList[i]}
                            minDate={startDateList[i]}
                        /> 
                        <span> To </span>
                        <DatePicker
                            name={`ptoEnd_${i}`} 
                            className="text-black"
                            selectsEnd
                            selected={endDateList[i]}
                            onChange={(date) => handleEndDateElementOnChange(date, i)}
                            endDate={endDateList[i]}
                            startDate={startDateList[i]}
                            minDate={startDateList[i]}
                        />                         
                        {startDateList.length > 1 && (
                            <button type="button" id="remove-btn" className="btn flex-row rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2"
                                onClick={() => handlePTORemove(i)}>
                                <span>Remove</span>
                            </button>
                        )}
                        {startDateList.length - 1 === i && startDateList.length < 10 && (
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