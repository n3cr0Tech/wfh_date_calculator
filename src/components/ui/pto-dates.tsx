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
        const list = [...startDateList];
        list.splice(index, 1);
        setStartDateList(list);
    }

    const handleStartDateElementOnChange = (event: any, index: number) =>{
        const {name, value} = event.target;
        const list = [...startDateList];
        list[index] = value;
        setStartDateList(list);
    }

    const handleEndDateElementOnChange = (event: any, index: number) =>{
        const {name, value} = event.target;
        const list = [...endDateList];
        list[index] = value;
        setEndDateList(list);
    }

    return(
        <div>
            <label>PTO Date</label>
            {
                startDateList.map((e, i) =>(
                    <div key={`pto_${i}`}>
                         <DatePicker
                            name={`ptoStart_${i}`} 
                            className="text-black"
                            selectsEnd
                            selected={e}
                            onChange={(e) => handleStartDateElementOnChange(e, i)}
                            endDate={endDateList[i]}
                            startDate={startDateList[i]}
                            minDate={startDateList[i]}
                        /> 
                        <span> To </span>
                        <DatePicker
                            name={`ptoEnd_${i}`} 
                            className="text-black"
                            selectsEnd
                            selected={e}
                            onChange={(e) => handleEndDateElementOnChange(e, i)}
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