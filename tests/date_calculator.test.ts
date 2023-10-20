import { intervalToDuration } from "date-fns";
import { CalculateTotalWorkDays, CalculateWeekendDaysAndHolidayDates, GetBankHolidaysWithinStartEndDates, GetDatesBetweenStartEndDates, GetDatesToAttendOfficeWithinCycle, GetEndDateOfWorkCycle, GetWeekendDayDates, GetWeekendDaysCount } from "../src/utils/dateCalculator";
import GetCalculatedOutputForUser from "../src/components/workdayCalculator";
import { FormData } from "../src/models/formData";

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
    expect(actual.length).toBe(2);
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

test('GetEndDateOfWorkCycle returns properly', () => {
    let today = new Date();
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let weeksInACycle = 1;
    let actual = GetEndDateOfWorkCycle(startDate, 1);
    let expected = new Date(`${today.getFullYear()}-01-08`);
    expect(actual).toStrictEqual(expected);
})

test('GetDatesToAttendOfficeWithinCycle returns properly', () => {
    let today = new Date();
    let todayMock = new Date(`${today.getFullYear()}-01-01`);
    let startDate = new Date(`${today.getFullYear()}-01-01`);

    let pto0 = new Date(`${today.getFullYear()}-01-02`);
    let ptoDates = [pto0];
    let actual = GetDatesToAttendOfficeWithinCycle(todayMock, startDate, 1, ptoDates);
    expect(actual.length).toBe(4);

})

test('GetCalculatedOutputForUser returns properly', () => {
    let today = new Date();
    let startDate = new Date(`${today.getFullYear()}-01-01`);    
    let ptoDate0 = new Date(`${today.getFullYear()}-01-02`);

    let mockFormData = createMockFormData(startDate, ptoDate0);
    let actual = GetCalculatedOutputForUser(startDate, mockFormData);
    expect(actual.length).toBe(4);
});

function createMockFormData(startDate: Date, ptoDate: Date): FormData{
    
    let mockData ={
        startDate: startDate,
        ptoDates: {
            startDates: [ptoDate],
            endDates: [ptoDate]
        },
        attendanceRequired: 60,
        weeksInWorkCycle: 1
    } as FormData;

    return mockData;
}

