import GetBankHolidays from "@/common/bankHolidays";
import { start } from "repl";

export function GetEndDateOfWorkCycle(startDate: Date, weeksInACycle: number): Date{
    let result = {} as Date;
    result = startDate;
    let daysInCycle = weeksInACycle * 7;
    result.setDate(startDate.getDate() + daysInCycle);
    return result;

}

export function CalculateTotalDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate();

    return dateDiff;
}

export function CalculateTotalWorkDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate(); //number of days between dates
    let weekendDaysCount = GetWeekendDaysCount(a, b);
    let bankHolidaysCount = GetBankHolidaysWithinStartEndDates(startDate, endDate);

    let result = dateDiff - weekendDaysCount - bankHolidaysCount;
    return result;
}


// return list of Dates to be in the office
export function GetDatesToAttendOfficeWithinCycle(startDateOfWorkCycle: Date, numberOfWeeksInCycle: number, ptoDates: Date[]): Date[]{
    let result = [] as Date[];
    let curDateLoop = GetDateToStartLoopFrom(startDateOfWorkCycle);
    let endDateLoop = GetEndDateOfWorkCycle(startDateOfWorkCycle, numberOfWeeksInCycle);
    while(curDateLoop <= endDateLoop){
        if(DateIsValid(curDateLoop, ptoDates)){
            result.push(curDateLoop);
        }
        curDateLoop.setDate(curDateLoop.getDate() + 1); // advance by 1 day to continue loop
    }
    return result;
}

export function GetDatesBetweenStartEndDates(startDate: Date, endDate: Date): Date[]{
    let result = [] as Date[]
    let curDateLoop = startDate;
    while(curDateLoop <= endDate){
        result.push(curDateLoop);
        curDateLoop.setDate(curDateLoop.getDate() + 1); // advance by 1 day to continue loop
    }
    return result;
}

function DateIsValid(date: Date, ptoDates: Date[]): boolean{
    let dateIsWorkday = DateIsWorkday(date);
    let dateIsBankHoliday = DateIsBankHoliday(date, GetBankHolidays());
    let dateIsPTO = DateIsPTO(date, ptoDates);
    let result = dateIsWorkday && !dateIsBankHoliday && !dateIsPTO
    return result;
}

function DateIsPTO(dateToFind: Date, ptoDates: Date[]): boolean{
    let result = false;    
    for(let i = 0; i < ptoDates.length; i++){
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
    let yearsMatch = dateA.getFullYear() === dateB.getFullYear();
    let monthsMatch = dateA.getMonth() === dateB.getMonth();
    let daysMatch = dateA.getDay() === dateB.getDay();
    return yearsMatch && monthsMatch && daysMatch;
}

function DateIsWorkday(date: Date): boolean{
    let dayNumber = date.getDay();
    // day number of Saturday is 5, Sunday is 6
    let result = dayNumber < 5
    return result;
}


function DateIsWeekend(date: Date): boolean{
    let dayNumber = date.getDay();
    // day number of Saturday is 5, Sunday is 6
    let result = dayNumber == 5 || dayNumber == 6;
    return result;
}

function GetDateToStartLoopFrom(startDateOfWorkCycle: Date): Date{
    let today = new Date();
    let result = today;
    if(today < startDateOfWorkCycle){
        result = startDateOfWorkCycle;
    }
    return result;
}

function GetBankHolidaysWithinStartEndDates(startDate: Date, endDate: Date): number{
    let bankHolidays = GetBankHolidays();
    let counter = 0;
    for(let i = 0; i < bankHolidays.length; i++){
        // if bankHoliday is within the start & end dates, then increment counter
        if(bankHolidays[i] >= startDate && bankHolidays[i] <= endDate){
            counter++;
        }
    }
    return counter;
}

// Returns the number of weekend days between dates (inclusive)
function GetWeekendDaysCount(startDate: Date, endDate: Date): number{
    let curDateLoop = startDate;
    let workdayCounter = 0;
    while(curDateLoop <= endDate){
        if(DateIsWeekend(curDateLoop)){
            workdayCounter++;
        }        
        curDateLoop.setDate(curDateLoop.getDate() + 1); // advance by 1 day to continue loop
    }
    return workdayCounter;
}