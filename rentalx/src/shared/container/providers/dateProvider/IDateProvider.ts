interface IDateProvider
{
    dateNow():Date;
    convertToUTC(date:Date):string;
    compareInHours(start_date:Date, end_date:Date):Number;
    fixDate(date:Date):Date;
    compareInDay(start_date:Date, end_date:Date):number;
    addDays(days:number):Date;
    addHours(hours:number):Date;
    checkIfExpired(start_date:Date, end_date:Date):Boolean;
}

export {IDateProvider};