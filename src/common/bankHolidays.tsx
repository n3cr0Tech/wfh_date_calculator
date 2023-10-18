export default function GetBankHolidays(){
    let today = new Date();
    let bh0 = new Date(today.getFullYear(), 1, 1); //New year's
    let bh1 = new Date(today.getFullYear(), 1, 16); 
    let bh2 = new Date(today.getFullYear(), 2, 20);
    let bh3 = new Date(today.getFullYear(), 5, 29);
    let bh4 = new Date(today.getFullYear(), 6, 19);
    let bh5 = new Date(today.getFullYear(), 7, 4);
    let bh6 = new Date(today.getFullYear(), 9, 4);
    let bh7 = new Date(today.getFullYear(), 10, 9);
    let bh8 = new Date(today.getFullYear(), 10, 23);    
    let bh9 = new Date(today.getFullYear(), 11, 11);
    let bh10 = new Date(today.getFullYear(), 12, 25);

    let result = [] as Date[];
    result.push(bh0);
    result.push(bh1);
    result.push(bh2);
    result.push(bh3);
    result.push(bh4);
    result.push(bh5);
    result.push(bh6);
    result.push(bh7);
    result.push(bh8);
    result.push(bh9);
    result.push(bh10);
    return result;    
}
