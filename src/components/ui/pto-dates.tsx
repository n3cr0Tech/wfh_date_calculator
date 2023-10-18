import React, { useState } from "react";


export default function PTODates(){
    const [ptoList, setPTOList] = useState([{pto: ""}]);

    console.log(ptoList);

    const handlePTOAdd = () => {
        setPTOList([...ptoList, {pto: ""}]);
    };

    const handlePTORemove = (index:number) => {
        const list = [...ptoList];
        list.splice(index, 1);
        setPTOList(list);
    }

    const handlPTOElementOnChange = (event: any, index: number) =>{
        const {id, value} = event.target;
        const list = [...ptoList];
        list[index].pto = value;
        setPTOList(list);
    }

    return(
        <div>
            <label>PTO Date</label>
            {
                ptoList.map((ptoElement, i) =>(
                    <div key={`pto_${i}`}>
                        <input name={`ptoStart_${i}`} type="text" required className="text-black"
                        value={ptoElement.pto}
                        onChange={(e) => handlPTOElementOnChange(e, i)}
                        />  
                        {ptoList.length > 1 && (
                            <button type="button" id="remove-btn" className="btn flex-row rounded-md text-white bg-blue-600 hover:bg-blue-700 py-2 px-2"
                                onClick={() => handlePTORemove(i)}>
                                <span>Remove</span>
                            </button>
                        )}
                        {ptoList.length - 1 === i && ptoList.length < 10 && (
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