import { FormData } from "@/models/formData";
import { GetDatesBetweenStartEndDates, GetDatesToAttendOfficeWithinCycle } from "@/utils/dateCalculator";
import { start } from "repl";


export default function GetCalculatedOutputForUser(formData: FormData, ): string{
    let result = `The entered data is foo blah blah`;
    let flattenedPTODates = FlattenPTODates(formData.ptoDates.startDates, formData.ptoDates.endDates);
    let datesToGoToOffice = GetDatesToAttendOfficeWithinCycle(formData.startDate, formData.weeksInWorkCycle, formData.)

    return result;
}

// Ex: turns start & end dates of 04/25 to 04/28 and returns Date[]:
// [04/25, 04/26, 04/27, 04/28] (all as Date objects)
function FlattenPTODates(startDates: Date[], endDates: Date[]): Date[]{
    let flattenedDates = [] as Date[];
    for(let i = 0; i < startDates.length; i++){
        let curDateRange = FlattenStartEndDates(startDates[i], endDates[i]);
        flattenedDates.concat(curDateRange);
    }
    return flattenedDates;
}

// return the Dates in between start and end dates
function FlattenStartEndDates(dateStart: Date, dateEnd: Date): Date[] {
    let result = [] as Date[];
    //account for user mistake of not editing the end date UI properly
    //if the end date comes before the start date THEN just assume the result is just the startDate (instead of a range of dates)
    if(dateEnd < dateStart){
        result.push(dateStart);
    }else{
        result = GetDatesBetweenStartEndDates(dateStart, dateEnd);
    }
    return result;
}