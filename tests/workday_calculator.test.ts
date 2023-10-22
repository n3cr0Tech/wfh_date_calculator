
import GetCalculatedOutputForUser, { FlattenPTODates, FlattenStartEndDates, GetWorkRatio } from "../src/components/workdayCalculator";
import { FormData } from "../src/models/formData";
import { mock } from "node:test";
import { parse } from "date-fns";

test('GetWorkRatio returns properly', () => {    
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());
    let possibleWorkDaysTotal = 5;
    let actual = GetWorkRatio(startDate, endDate, possibleWorkDaysTotal);
    expect(actual).toBe(1); // 1 because A/B where A is the possible workdays total (no pto in this scenario) and B is the total workdays
});

test('FlattenStartEndDates returns properly', () => {
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());

    let actual = FlattenStartEndDates(startDate, endDate);
    expect(actual.length).toBe(7);
});

test('FlattenPTODates returns properly', () => {
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());
    let endDate = parse('2023-01-07', 'yyyy-MM-dd', new Date());
    let startList = [startDate];
    let endList = [endDate];    
    let actual = FlattenPTODates(startList, endList);
    expect(actual.length).toBe(7); 
});

test('GetCalculatedOutputForUser returns properly', () => {
    let today = new Date();
    let startDate = parse('2023-01-01', 'yyyy-MM-dd', new Date());
    let ptoDate0 = parse('2023-01-02', 'yyyy-MM-dd', new Date());    

    let mockFormData = createMockFormData(startDate, ptoDate0);
    let actual = GetCalculatedOutputForUser(startDate, mockFormData);
    expect(actual.substring(0, 3)).toStrictEqual("YES");
});

test('GetCalculatedOutputForUser returns properly for bug Mima found', () => {    
    let mockToday = parse('2023-10-21', 'yyyy-MM-dd', new Date());    
    let startDate = parse('2023-12-03', 'yyyy-MM-dd', new Date());    
    let ptoDate0 = parse('2023-12-04', 'yyyy-MM-dd', new Date());    

    let mockFormData = createMockFormData(startDate, ptoDate0);
    let actual = GetCalculatedOutputForUser(mockToday, mockFormData);
    expect(actual.substring(0, 3)).toStrictEqual("YES");
});


function createMockFormData(startDate: Date, ptoDate: Date): FormData{
    
    let mockData ={
        startDate: startDate,
        ptoDates: {
            startDates: [ptoDate],
            endDates: [ptoDate]
        },
        attendanceRequired: 60,
        weeksInWorkCycle: 12
    } as FormData;

    return mockData;
}


