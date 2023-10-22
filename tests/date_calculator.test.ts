import { intervalToDuration, parse } from "date-fns";
import { CalculateTotalWorkDays, CalculateWeekendDaysAndHolidayDates, GetBankHolidaysWithinStartEndDates, GetDatesBetweenStartEndDates, GetDatesToAttendOfficeWithinCycle, GetDaysBetweenDatesInclusive, GetEndDateOfWorkCycle, GetWeekendDayDates, GetWeekendDaysCount } from "../src/utils/dateCalculator";




test('GetDatesBetweenStartEndDates returns properly', () => {
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());

    let actual = GetDatesBetweenStartEndDates(startDate, endDate);
    expect(actual.length).toBe(7);
});


test('Date subtractions works properly', () => {
    let today = new Date()
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());    
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());      
    let expected = 6;
    let actual = intervalToDuration(
        {
            start: startDate,
            end: endDate
        });
    expect(actual.days).toBe(expected);
});

test('GetWeekendDaysCount returns properly', () => {
    let today = new Date()
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());    
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());  
    let expected = 2;
    let actual = GetWeekendDaysCount(startDate, endDate);
    expect(actual).toBe(expected);
});

test('GetBankHolidaysWithinStartDates returns properly', () => {
    let today = new Date()
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());    
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());  
    let expected = startDate;
    let actual = GetBankHolidaysWithinStartEndDates(startDate, endDate);
    expect(actual.length).toBe(1);
    expect(actual[0]).toStrictEqual(expected);
});

test('CalculateWeekendDaysAndHolidayDates returns properly', () => {
    let today = new Date()
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());    
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());  
    
    let weekendDays = GetWeekendDayDates(startDate, endDate);
    let bankHolidaysCount = GetBankHolidaysWithinStartEndDates(startDate, endDate);

    let expected = startDate;
    let actual = CalculateWeekendDaysAndHolidayDates(weekendDays, bankHolidaysCount);
    expect(actual.length).toBe(2);
    expect(actual[0]).toStrictEqual(expected);
});

test('CalculateTotalWorkDays returns properly', () => {
    let today = new Date()
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());    
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());  
    let expected = 5;
    let actual = CalculateTotalWorkDays(startDate, endDate);
    expect(actual).toBe(expected);
});

test('GetEndDateOfWorkCycle returns properly', () => {
    let today = new Date();    
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());        
    let weeksInACycle = 1;
    let actual = GetEndDateOfWorkCycle(startDate, weeksInACycle);
    let expected = parse('2023-01-08', 'yyyy-MM-dd', new Date());  
    expect(actual).toStrictEqual(expected);
})

test('GetDatesToAttendOfficeWithinCycle returns properly', () => {    
    let endDate = parse('2023-01-08', 'yyyy-MM-dd', new Date());    
    let todayMock = parse('2023-01-01', 'yyyy-MM-dd', new Date());        

    let pto0 = parse('2023-01-02', 'yyyy-MM-dd', new Date());        
    let ptoDates = [pto0];
    let actual = GetDatesToAttendOfficeWithinCycle(todayMock, endDate, ptoDates);
    expect(actual.length).toBe(4);

})
