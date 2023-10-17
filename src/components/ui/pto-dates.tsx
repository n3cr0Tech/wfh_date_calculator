import React, { useState } from "react";


export default function PTODates(){
    const [ptoList, setPTOList] = useState([{pto: ""}]);

    const handlePTOAdd = () => {
        setPTOList([...ptoList, {pto: ""}]);
    };

    const handlePTORemove = (index:number) => {
        const list = [...ptoList];
        list.splice(index, 1);
        setPTOList(list);
    }


    const GeneratePTOInputs = () =>{
        return ptoList.map((singlePTO, i) =>(
            <div>
                <input name={`ptoStart_${i}`} type="text"/>  
                {ptoList.length > 1 &&
                    <button type="button" id="remove-btn" className="btn flex-row rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2"
                        onClick={() => handlePTORemove(i)}>
                        <span>Remove</span>
                    </button>
                }
                {ptoList.length - 1 === i && ptoList.length < 10 &&
                    <button type="button" id="add-btn" className="btn flex space-x-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2"
                    onClick={handlePTOAdd}
                    >
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