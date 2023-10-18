import GetBankHolidays from "@/common/bankHolidays";

export default function CalculateTotalDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate();

    return dateDiff;
}

export default function CalculateTotalWorkDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate();
    let weekendDaysCount = GetWeekendDaysCount(a, b);

    return dateDiff;
}

// return list of Dates to be in the office
export default function CalculateWorkDaysWithinCycle(startDateOfWorkCycle: Date, numberOfWeeksInCycle: number): Date[]{
    let result = [] as Date[];
    let curDateLoop = GetDateToStartLoopFrom(startDateOfWorkCycle);
    let endDateLoop = GetEndDateOfWorkCycle(startDateOfWorkCycle, numberOfWeeksInCycle);
    while(curDateLoop <= endDateLoop){

    }
}

// returns total number of pto days (excluding weekends & holidays)
// export default function CalculateTotalPTODays(startDateList: Date[], endDateList: Date[]): number{

// }

function DateIsValid(date: Date){
    let dateIsWorkday = DateIsWorkday(date);
    let dateIsBankHoliday = DateIsBankHoliday(date);
}

function DateIsBankHoliday(dateToFind: Date): boolean{
    let result = false;
    let bankHolidays = GetBankHolidays();
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