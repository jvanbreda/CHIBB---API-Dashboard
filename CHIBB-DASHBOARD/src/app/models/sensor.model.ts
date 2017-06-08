export class Sensor {
    public sid: string;
    public type: string;
    public location: string;
    public attributes: string[];

    public state: string;

    constructor(sid: string, type: string, location:string, attributes: string[]){
        this.sid = sid;
        this.type = type;
        this.location = location;
        this.attributes = attributes;
        this.state = "";
    }
}