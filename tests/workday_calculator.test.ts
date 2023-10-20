import { GetDatesBetweenStartEndDates } from "../src/utils/dateCalculator";
import GetCalculatedOutputForUser, { FlattenPTODates, FlattenStartEndDates, GetWorkRatio } from "../src/components/workdayCalculator";
import { FormData } from "../src/models/formData";

test('GetWorkRatio returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
    let possibleWorkDaysTotal = 5;
    let actual = GetWorkRatio(startDate, endDate, possibleWorkDaysTotal);
    expect(actual).toBe(1);
});


test('GetDatesBetweenStartEndDates returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);

    let actual = GetDatesBetweenStartEndDates(startDate, endDate);
    expect(actual.length).toBe(7);
});

test('FlattenStartEndDates returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-02`);

    let actual = FlattenStartEndDates(startDate, endDate);
    expect(actual.length).toBe(2);
});

test('FlattenPTODates returns properly', () => {
    let today = new Date()
    let startDate = new Date(`${today.getFullYear()}-01-01`);
    let endDate = new Date(`${today.getFullYear()}-01-07`);
    let startList = [startDate];
    let endList = [endDate];    
    let actual = FlattenPTODates(startList, endList);
    expect(actual.length).toBe(7); 
});

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


