const store=window.electron.store
export default class Schedule{
    id: number;
    name: string;
    description: string;
    date: string;
    endDate: string;


    public constructor(schedule: Schedule) {
        this.id = store.get('user').schedules.length+1;
        this.name = schedule.name;
        this.description = schedule.description;
        this.date = schedule.date;
        this.endDate = schedule.endDate;
    }
}