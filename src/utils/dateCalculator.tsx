import { intervalToDuration, addDays } from "date-fns";
import GetBankHolidays from "../common/bankHolidays";

export function GetEndDateOfWorkCycle(startDate: Date, weeksInACycle: number): Date{
    let result = new Date(startDate);
    result.setHours(0,0,0,0);
    let daysInCycle = weeksInACycle * 7;    
    result = addDays(startDate, daysInCycle);
    return result;

}

// NOT using this function bcuz it has weird inconsistencies
// it would be correct on some online compiler but NOT here in the unit tests
// export function CalculateTotalDays(startDate: Date, endDate: Date): number{
//     let a = new Date(startDate);
//     let b = new Date(endDate);
//     let dateDiff = b.getDate() - a.getDate();

//     return dateDiff;
// }

export function CalculateTotalWorkDays(startDate: Date, endDate: Date): number{
    console.log(`CalculateTotalWorkDays: ${startDate} TO ${endDate}`);
    let a = new Date(startDate);
    let b = new Date(endDate);    
    let dateDiff = GetDaysBetweenDatesInclusive(startDate, endDate).length;
    // console.log(`dateDiff: ${dateDiff}`);

    let weekendDays = GetWeekendDayDates(a, b);
    let bankHolidays = GetBankHolidaysWithinStartEndDates(startDate, endDate);
    let combinedWeekednDaysAndHolidaysCount = CalculateWeekendDaysAndHolidayDates(weekendDays, bankHolidays).length;
    // console.log(`weekendDays: ${weekendDays}`);
    // console.log(`bankHolidaysCount: ${bankHolidays.length}`);
    // console.log(`combinedWeekednDaysAndHolidaysCount: ${combinedWeekednDaysAndHolidaysCount}`);
    let result = dateDiff - combinedWeekednDaysAndHolidaysCount;
    return result;
}

// made this into a loop instead of intervalToDuration() bcuz
// intervalToDuration()  cant calculate solely on days
export function GetDaysBetweenDatesInclusive(startDate: Date, endDate: Date){
    let result = [] as Date[];        
    let curDateLoop = new Date(startDate); //deepcopy  
    curDateLoop.setHours(0,0,0,0);  
    endDate.setHours(0,0,0,0);
    // console.log(`!!! GetDatesToAttendOfficeWithinCycle.endDateLoop: ${endDateLoop}`);
    while(curDateLoop <= endDate){
        let tmp = new Date(curDateLoop);  
        tmp.setHours(0,0,0,0);
        result.push(tmp);                
        curDateLoop = addDays(curDateLoop, 1); // advance by 1 day to continue loop
    }
    return result;
}


// return list of Dates to be in the office
export function GetDatesToAttendOfficeWithinCycle(today: Date, endDateCycle: Date, ptoDates: Date[]): Date[]{
    let result = [] as Date[];    
    // let tmp = GetDateToStartLoopFrom(today, startDateOfWorkCycle);
    let curDateLoop = new Date(today); //deepcopy
    // console.log(`!!! GetDatesToAttendOfficeWithinCycle.startDay: ${curDateLoop}`);
    let endDateLoop = new Date(endDateCycle);
    endDateLoop.setHours(0,0,0,0);
    // console.log(`!!! GetDatesToAttendOfficeWithinCycle.endDateLoop: ${endDateLoop}`);
    while(curDateLoop <= endDateLoop){
        console.log(`!!! GetDatesToAttendOfficeWithinCycle loop; ${curDateLoop} <VS> ${endDateLoop}`)        
        if(DateIsValidWorkday(curDateLoop, ptoDates)){            
            let tmp = new Date(curDateLoop);          
            tmp.setHours(0,0,0,0);
            // console.log(tmp);
            result.push(tmp);
        }
        curDateLoop = addDays(curDateLoop, 1); // advance by 1 day to continue loop
    }
    return result;
}

export function GetDatesBetweenStartEndDates(startDate: Date, endDate: Date): Date[]{
    let result = [] as Date[]
    let curDateLoop = new Date(startDate);
    while(curDateLoop <= endDate){
        let tmp = new Date(curDateLoop);
        result.push(tmp);
        curDateLoop = addDays(curDateLoop, 1); // advance by 1 day to continue loop
    }
    // console.log("!!! GetDatesBetweenStartEndDates");
    // console.log(result);
    return result;
}

// If day IS a weekday AND not a PTO nor a bank holiday
function DateIsValidWorkday(date: Date, ptoDates: Date[]): boolean{    
    // console.log(`checking if date is valid: ${date}; dayNumber: ${date.getDay()}`);
    let dateIsWorkday = DateIsWorkday(date);
    let dateIsBankHoliday = DateIsBankHoliday(date, GetBankHolidays());
    let dateIsPTO = DateIsPTO(date, ptoDates);
    let result = dateIsWorkday && !dateIsBankHoliday && !dateIsPTO
    console.log(`isWorkDay: ${dateIsWorkday}...isHoliday: ${dateIsBankHoliday}...isPTO: ${dateIsPTO}`);
    return result;
}

function DateIsPTO(dateToFind: Date, ptoDates: Date[]): boolean{
    let result = false;    
    for(let i = 0; i < ptoDates.length; i++){
        // console.log(`Determining MATCH: ${dateToFind} <VS> ${ptoDates[i]}`);
        if(DatesMatch(dateToFind, ptoDates[i])){
            result = true;
            break;
        }
    }
    return result;
}

function DateIsBankHoliday(dateToFind: Date, bankHolidays: Date[]): boolean{
    let result = false;    
    for(let i = 0; i < bankHolidays.length; i++){
        if(DatesMatch(dateToFind, bankHolidays[i])){
            result = true;
            break;
        }
    }
    return result;
}

function DatesMatch(dateA: Date, dateB: Date){
    // console.log(`dateA: ${dateA}`);
    // console.log(`dateB: ${dateB}`);
    let yearsMatch = dateA.getFullYear() === dateB.getFullYear();
    let monthsMatch = dateA.getMonth() === dateB.getMonth();
    let daysMatch = dateA.getDate() === dateB.getDate();
    return yearsMatch && monthsMatch && daysMatch;
}

function DateIsWorkday(date: Date): boolean{
    let dayNumber = date.getDay();
    // day number of Sunday is 0, Saturday is 6
    let result = dayNumber != 0 && dayNumber != 6;
    return result;
}


function DateIsWeekend(date: Date): boolean{
    let dayNumber = date.getDay();
    // day number of Sunday is 0, Saturday is 6
    let result = dayNumber == 0 || dayNumber == 6;
    return result;
}

function GetDateToStartLoopFrom(today: Date, startDateOfWorkCycle: Date): Date{    
    let result = today;
    if(today < startDateOfWorkCycle){
        result = startDateOfWorkCycle;
    }
    return result;
}

export function GetBankHolidaysWithinStartEndDates(startDate: Date, endDate: Date): Date[]{
    let bankHolidays = GetBankHolidays();
    let result = [] as Date[];
    for(let i = 0; i < bankHolidays.length; i++){
        // if bankHoliday is within the start & end dates, then increment counter
        if(bankHolidays[i] >= startDate && bankHolidays[i] <= endDate){
            result.push(bankHolidays[i]);
        }
    }
    return result;
}

// Returns the number of weekend days between dates (inclusive)
export function GetWeekendDaysCount(startDate: Date, endDate: Date): number{
    let count = GetWeekendDayDates(startDate, endDate).length;
    return count;
}

export function GetWeekendDayDates(startDate: Date, endDate: Date): Date[]{
    let curDateLoop = new Date(startDate);
    curDateLoop.setHours(0,0,0,0);
    let result = [] as Date[];
    while(curDateLoop <= endDate){
        if(DateIsWeekend(curDateLoop)){
            let tmp = new Date(curDateLoop);
            tmp.setHours(0,0,0,0);
            result.push(tmp);
        }        
        curDateLoop = addDays(curDateLoop, 1); // advance by 1 day to continue loop
    }
    return result;
}

// Prevents duplicate counting of a date being BOTH a weekend AND a holiday
// Example: if Jan 1st is a Sunday AND a bank holiday, it should only be accounted for once
export function CalculateWeekendDaysAndHolidayDates(weekendDays: Date[], holidays: Date[]): Date[]{
    let result = [] as Date[];

    //deep copy weekend days into result[]
    for(let i = 0; i < weekendDays.length; i++){
        let tmp = new Date(weekendDays[i]);
        tmp.setHours(0,0,0,0);
        result.push(tmp);
    }

    for(let i = 0; i < holidays.length; i++){
         // if weekend is not already a holiday, add to result array
         if(!DateIsInList(holidays[i], result)){
            let tmp = new Date(holidays[i]);
            tmp.setHours(0,0,0,0);
            result.push(tmp);
        }        
    }

    return result;
}

function DateIsInList(date: Date, arr: Date[]): boolean{
    let result = false;
    for(let j = 0; j < arr.length; j++){
        if(DatesMatch(date, arr[j])){
            result = true;
        }
    }
    return result;
}