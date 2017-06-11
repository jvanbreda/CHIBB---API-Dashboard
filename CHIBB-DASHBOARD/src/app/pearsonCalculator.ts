export class PearsonCalculator {

	// This static method calculates the pearson coefficient. Based on formulae provided during
	// the course INFDTA01-1 (recommendation systems)

	static calculateSimilarity(sensordata1, sensordata2){
		var a: number = 0;
		var b1: number = 0;
		var b2: number = 0;
		var c: number = 0;
		var d: number = 0;

		var n: number = 0;

		var minLength = Math.min(sensordata1.length, sensordata2.length)

		for (var i = 0; i < minLength; i++) {
			if(sensordata1[i] && sensordata2[i]){
				var time: number = sensordata2[i].x
				if(sensordata1.find(item =>  item.x === time)){
					var value1 = sensordata1.find(item =>  item.x === time).y
					a += value1 * sensordata2[i].y;
					b1 += value1;
					b2 += sensordata2[i].y
					c += Math.pow(value1, 2);
					d += Math.pow(sensordata2[i].y, 2);
					n++;
				}
			}
		}

		return (a - (b1 * b2) / n) / ( Math.sqrt(c - (Math.pow(b1, 2)) / n) * Math.sqrt(d - Math.pow(b2, 2) / n));
	}
}