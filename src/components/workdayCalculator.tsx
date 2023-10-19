import { FormData } from "@/models/formData";
import { CalculateTotalWorkDays, GetDatesBetweenStartEndDates, GetDatesToAttendOfficeWithinCycle, GetEndDateOfWorkCycle } from "@/utils/dateCalculator";
import { start } from "repl";


export default function GetCalculatedOutputForUser(formData: FormData ): string{
    let result = ``;
    let endDateInCycle = GetEndDateOfWorkCycle(formData.startDate, formData.weeksInWorkCycle);

    let flattenedPTODates = FlattenPTODates(formData.ptoDates.startDates, formData.ptoDates.endDates);    
    let datesToBeInTheOffice = GetDatesToAttendOfficeWithinCycle(formData.startDate, formData.weeksInWorkCycle, flattenedPTODates);
    let workDaysRatio = GetWorkRatio(formData.startDate, endDateInCycle, datesToBeInTheOffice.length);

    if(ItIsPossibleToMeetAttendanceRequirement(workDaysRatio, formData.attendanceRequired)){        
        result = `YES: It's possible to fulfill the required office attendance of ${formData.attendanceRequired}% `;
        result += GetSuccessOutputString(datesToBeInTheOffice);
    }else{
        let today = new Date();
        result = `NO: It is too late to calculate the attendance dates based on the date today: ${today.getDate()} and the given start of the work cycled: ${formData.startDate.getDate()}\n`;
        result += `It wont be possible to complete the attendance percentage of: ${formData.attendanceRequired}% with the given data`;
    }

    return result;
}

function GetSuccessOutputString(datesToBeInOffice: Date[]): string{
    let result = `You just need to go to the office in the following dates: `;
    for(let i = 0; i < datesToBeInOffice.length; i++){
        let formattedDate = FormattedDateStamp(datesToBeInOffice[i]);
        result += `${formattedDate} \n`;
    }
    return result;
}

function FormattedDateStamp(dateObject: Date): string{
    var dayTmp = String(dateObject.getDate());
    dayTmp += "0";
    const day = dayTmp.slice(-2);
    
    var monthTmp = String(dateObject.getMonth() + 1)
    monthTmp += "0";
    const month = monthTmp.slice(-2);
    const year = dateObject.getFullYear();   

    // const time = String(dateObject).split(' ')[4];
    // // prints date in YYYY-MM-DD format
    // console.log(`${year}-${month}-${day}`);
    // // prints date & time in YYYY-MM-DD HH:MM:SS format
    // console.log(`${year}-${month}-${day} ${time}`);
    let result = `${year}-${month}-${day}`; 
    return result;
}

function GetWorkRatio(startDateCycle: Date, endDateCycle: Date, datesToBeInOffice: number): number{    
    let totalWorkDaysInCycle = CalculateTotalWorkDays(startDateCycle, endDateCycle);    
    let ratio = datesToBeInOffice / totalWorkDaysInCycle;
    return ratio;
}

function ItIsPossibleToMeetAttendanceRequirement(ratio: number, attendancePercentNeeded: number): boolean{    
    let result = ratio >= attendancePercentNeeded;
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