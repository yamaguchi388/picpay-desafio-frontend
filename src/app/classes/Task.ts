export class Task {
    
    public id: number;
    public name: string;
    public username: string;
    public title: string;
    public value: number;
    public date: string;
    public image: string;
    public isPayed: boolean;

    
    constructor (name: string, username: string, title: string, value: number, date: string, image: string, isPayed: boolean) {
        this.name     = name;
        this.username = username;
        this.title    = title;
        this.value    = value;
        this.date     = date;
        this.image    = image;
        this.isPayed  = isPayed;
    }

}