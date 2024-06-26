import { format } from "date-fns";
import { FormData } from "../models/formData";
import { CalculateTotalWorkDays, GetDatesBetweenStartEndDates, GetDatesToAttendOfficeWithinCycle, GetEndDateOfWorkCycle } from "../utils/dateCalculator";
import { PTODateRange } from "@/models/ptoDateRange";


export default function GetCalculatedOutputForUser(today: Date, formData: FormData ): string{
    // console.log("!!! GetCalculatedOutputForUser formData:");
    console.log(formData);
    let result = ``;
    //turn attendance requirement it into a decimal percentage
    formData.attendanceRequired /= 100;
    today.setHours(0,0,0,0);//set time to 0's because it can mess with the calculations
    formData.startDate.setHours(0,0,0,0);

    let endDateInCycle = GetEndDateOfWorkCycle(formData.startDate, formData.weeksInWorkCycle);
    // console.log(`!!! startDate0: ${formData.startDate}`);
    let flattenedPTODates = FlattenPTODates(formData.ptoDates);    
    // console.log(`!!! flattenedPTODates: ${flattenedPTODates}`);
    let datesToBeInTheOffice = GetDatesToAttendOfficeWithinCycle(today, endDateInCycle, flattenedPTODates);
    // console.log(`!!! startDate1: ${formData.startDate}`);
    // console.log(`!!! datesToBeInTheOffice: ${datesToBeInTheOffice}`);
    // console.log(`!!! datesToBeInTheOffice count: ${datesToBeInTheOffice.length}`);
    let workDaysRatio = GetWorkRatio(formData.startDate, endDateInCycle, datesToBeInTheOffice.length);
    // console.log(`!!! workDaysRatio: ${workDaysRatio}`);
    // console.log(`!!! startDate2: ${formData.startDate}`);


    // console.log(`!!! workRatio: ${workDaysRatio} <VS> attendanceReq: ${formData.attendanceRequired}`);
    if(ItIsPossibleToMeetAttendanceRequirement(workDaysRatio, formData.attendanceRequired)){        
        result = `YES: It's possible to fulfill the required office attendance of ${formData.attendanceRequired * 100}% \n\n`;
        result += GetSuccessOutputString(datesToBeInTheOffice);
    }else{
        let today = new Date();
        result = `NO: It is too late to calculate the attendance dates based on the date today: ${today} and the given start of the work cycled: ${formData.startDate}\n\n`;
        result += `It wont be possible to complete the attendance percentage of: ${formData.attendanceRequired * 100}% with the given data`;
    }

    // console.log(`!!! RESULT: ${result}`);
    return result;
}

function GetSuccessOutputString(datesToBeInOffice: Date[]): string{
    let result = `You just need to go to the office in the following dates: \n`;
    for(let i = 0; i < datesToBeInOffice.length; i++){
        let formattedDate = FormattedDateStamp(datesToBeInOffice[i]);
        result += `${formattedDate} \n`;
    }
    return result;
}

function FormattedDateStamp(dateObject: Date): string{    
    let result = format(dateObject, "yyyy-MM-dd");
    return result;
}

export function GetWorkRatio(startDateCycle: Date, endDateCycle: Date, possibleWorkDaysTotal: number): number{    
    // console.log(`GetWorkRatio: ${startDateCycle} TO ${endDateCycle}`);
    let totalWorkDaysInCycle = CalculateTotalWorkDays(startDateCycle, endDateCycle);    
    // console.log(`!!! totalWorkDaysInCycle: ${totalWorkDaysInCycle}`);
    let ratio = possibleWorkDaysTotal / totalWorkDaysInCycle;
    return ratio;
}

function ItIsPossibleToMeetAttendanceRequirement(ratio: number, attendancePercentNeeded: number): boolean{    
    let result = ratio >= attendancePercentNeeded;
    return result;
}

// Ex: turns start & end dates of 04/25 to 04/28 and returns Date[]:
// [04/25, 04/26, 04/27, 04/28] (all as Date objects)
export function FlattenPTODates(ptoDateRanges: PTODateRange[]): Date[]{
    var flattenedDates = [] as Date[];
    for(let i = 0; i < ptoDateRanges.length; i++){
        let curDateRange = FlattenStartEndDates(ptoDateRanges[i].startDate, ptoDateRanges[i].endDate);        
        flattenedDates = flattenedDates.concat(curDateRange) ;        
    }    
    return flattenedDates;
}

// return the Dates in between start and end dates
export function FlattenStartEndDates(dateStart: Date, dateEnd: Date): Date[] {
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