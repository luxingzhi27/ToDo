const store=window.electron.store
export default class Schedule{
    id: number;
    title: string;
    description: string;
    importance: number=0; /*0-3*/
    date: string;
    endDate: string;


    public constructor(schedule: Schedule) {
        this.id = store.get('user').schedules.length+1;
        this.title = schedule.title;
        this.description = schedule.description;
        this.date = schedule.date;
        this.endDate = schedule.endDate;
    }
}