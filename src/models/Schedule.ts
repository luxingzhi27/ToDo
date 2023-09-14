export default class Schedule{
    name: string;
    description: string;
    date: string;
    endDate: string;


    public constructor(schedule: Schedule) {
        this.name = schedule.name;
        this.description = schedule.description;
        this.Date = schedule.date;
        this.endDate = schedule.endDate;
    }
}