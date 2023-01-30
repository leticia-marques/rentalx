interface IDateProvider
{
    dateNow():Date;
    convertToUTC(date:Date):string;
    compareInHours(start_date:Date, end_date:Date):Number;
    fixDate(date:Date):Date;
}

export {IDateProvider};