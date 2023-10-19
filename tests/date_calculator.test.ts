import { intervalToDuration } from "date-fns";
import { CalculateTotalWorkDays, CalculateWeekendDaysAndHolidayDates, GetBankHolidaysWithinStartEndDates, GetDatesBetweenStartEndDates, GetDatesToAttendOfficeWithinCycle, GetEndDateOfWorkCycle, GetWeekendDayDates, GetWeekendDaysCount } from "../src/utils/dateCalculator";

test('Date subtractions works properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
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
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
    let expected = 2;
    let actual = GetWeekendDaysCount(startDate, endDate);
    expect(actual).toBe(expected);
});

test('GetBankHolidaysWithinStartDates returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
    let expected = startDate;
    let actual = GetBankHolidaysWithinStartEndDates(startDate, endDate);
    expect(actual.length).toBe(1);
    expect(actual[0]).toStrictEqual(expected);
});

test('CalculateWeekendDaysAndHolidayDates returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
    
    let weekendDays = GetWeekendDayDates(startDate, endDate);
    let bankHolidaysCount = GetBankHolidaysWithinStartEndDates(startDate, endDate);

    let expected = startDate;
    let actual = CalculateWeekendDaysAndHolidayDates(weekendDays, bankHolidaysCount);
    expect(actual.length).toBe(1);
    expect(actual[0]).toStrictEqual(expected);
});

test('CalculateTotalWorkDays returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
    let expected = 5;
    let actual = CalculateTotalWorkDays(startDate, endDate);
    expect(actual).toBe(expected);
});
