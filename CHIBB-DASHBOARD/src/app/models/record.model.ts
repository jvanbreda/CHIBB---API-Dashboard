export class Record {
	public value: Number;
	public timeStamp: Number;
	public sensorState: string;
	public sensorBatteryLevel: Number;
	public unit: string;

	constructor(value:Number, timestamp:Number, sensorState:string, sensorBatteryLevel:Number, unit:string) {
		this.value = value;
		this.timeStamp = timestamp;
		this.sensorState = sensorState;
		this.sensorBatteryLevel = sensorBatteryLevel;
		this.unit = unit;
	}
}