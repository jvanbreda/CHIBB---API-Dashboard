var message;
var valueDataSet;

onmessage = function(event){
	message = event.data.message;
	valueDataSet = event.data.valueDataSet;
	console.log(message);
	drawGraph();
}

function drawGraph() {
	valueDataSet.add({
        x: message.x,
        y: message.y,
   	})
	
}