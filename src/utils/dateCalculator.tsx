import GetBankHolidays from "@/common/bankHolidays";

export function CalculateTotalDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate();

    return dateDiff;
}

export function CalculateTotalWorkDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate();
    let weekendDaysCount = GetWeekendDaysCount(a, b);

    return dateDiff;
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

// returns total number of pto days (excluding weekends & holidays)
// export default function CalculateTotalPTODays(startDateList: Date[], endDateList: Date[]): number{

// }

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

function GetDateToStartLoopFrom(startDateOfWorkCycle: Date): Date{
    let today = new Date();
    let result = today;
    if(today < startDateOfWorkCycle){
        result = startDateOfWorkCycle;
    }
    return result;
}

function GetEndDateOfWorkCycle(startDate: Date, weeksInACycle: number): Date{
    let result = {} as Date;
    result = startDate;
    let daysInCycle = weeksInACycle * 7;
    result.setDate(startDate.getDate() + daysInCycle);
    return result;

}

function GetWeekendDaysCount(startDate: Date, endDate: Date): number{
    
}