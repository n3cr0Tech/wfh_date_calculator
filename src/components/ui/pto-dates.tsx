import React, { useState } from "react";


export default function PTODates(){
    const [ptoList, setPTOList] = useState([
        {pto: ""},
        {pto: ""},
    ]);


    const GeneratePTOInputs = () =>{
        return ptoList.map((singlePTO, i) =>(
            <div>
                <input name={`ptoStart_${i}`} type="text"/>               
                <button type="button" id="remove-btn" className="btn flex-row rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2">
                    <span>Remove</span>
                </button>
                {ptoList.length - 1 === i && 
                    <button type="button" id="add-btn" className="btn flex space-x-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2">
                    <span>Add</span>
                    </button>
                }
            </div>
        ));
    }

    return(
        <div>
            <label>PTO Date</label>
            <GeneratePTOInputs></GeneratePTOInputs>
            
        </div>

    );
}