var i;
var array;

onmessage = function(event){
	i = 0;
	array = event.data;
	parseData();
}

function parseData() {
    postMessage(array[i]);
	if(i == array.length - 1){
		postMessage("Done")
		self.close();
	}
	i++;
    setTimeout("parseData()", 1);
}