import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider
{
    compareInDay(start_date: Date, end_date: Date): number
    {
        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);
        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }
    convertToUTC(date: Date): string
    {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): Number
    {
        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);
        return dayjs(end_date_utc).diff(start_date_utc, "hour");
    }

    dateNow():Date
    {
        return dayjs().toDate();
    }

    fixDate(date:Date):Date
    {
        return dayjs(date).toDate();
    }    

    addDays(days: number): Date {
        return dayjs().add(days, "day").toDate();
    }

    addHours(hours: number): Date 
    {
        return dayjs().add(hours, "hour").toDate();
    }

    checkIfExpired(start_date: Date, end_date: Date): Boolean 
    {
        return dayjs(start_date).isBefore(end_date);    
    }
   
}

export {DayjsDateProvider};