import { parse } from "date-fns";

export default function GetBankHolidays(){
    let today = new Date();
    let bh0 = parse(`${today.getFullYear()}-01-01`, 'yyyy-MM-dd', new Date());


   
    let bh1 = parse(`${today.getFullYear()}-01-16`, 'yyyy-MM-dd', new Date()); 
    let bh2 = parse(`${today.getFullYear()}-02-20`, 'yyyy-MM-dd', new Date());
    let bh3 = parse(`${today.getFullYear()}-05-29`, 'yyyy-MM-dd', new Date());
    let bh4 = parse(`${today.getFullYear()}-06-19`, 'yyyy-MM-dd', new Date());
    let bh5 = parse(`${today.getFullYear()}-07-04`, 'yyyy-MM-dd', new Date());
    let bh6 = parse(`${today.getFullYear()}-09-04`, 'yyyy-MM-dd', new Date());
    let bh7 = parse(`${today.getFullYear()}-10-09`, 'yyyy-MM-dd', new Date());
    let bh8 = parse(`${today.getFullYear()}-10-23`, 'yyyy-MM-dd', new Date());
    let bh9 = parse(`${today.getFullYear()}-11-11`, 'yyyy-MM-dd', new Date());
    let bh10 = parse(`${today.getFullYear()}-12-25`, 'yyyy-MM-dd', new Date());

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
