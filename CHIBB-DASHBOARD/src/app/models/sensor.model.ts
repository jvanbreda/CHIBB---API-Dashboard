export class Sensor {
    public sid: string;
    public type: string;
    public attributes: string[];

    constructor(sid: string, type: string, attributes: string[]){
        this.sid = sid;
        this.type = type;
        this.attributes = attributes;
    }
}