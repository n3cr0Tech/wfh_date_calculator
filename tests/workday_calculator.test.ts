import { GetDatesBetweenStartEndDates } from "../src/utils/dateCalculator";
import { FlattenPTODates, FlattenStartEndDates } from "../src/components/workdayCalculator";





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

