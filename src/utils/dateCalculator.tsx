export default function CalculateTotalDays(startDate: Date, endDate: Date): number{
    let a = new Date(startDate);
    let b = new Date(endDate);
    let dateDiff = b.getDate() - a.getDate();

    return dateDiff;
}