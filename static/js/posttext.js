var ws = new WebSocket("ws://localhost:8888/websocket");
ws.onmessage = function(event) {
	data = $.parseJSON(event.data)
	try{
		message = $.parseJSON(data.message);
		particle(message.x,message.y);
	}
	catch(err){
		displayMessage(data.message);
		displayCount(data.count);
	}
};

function postText(){
	ws.send($("#text").val());
	$("#text").val('')
}

function displayMessage(message){
	if (data.message !== ""){
		$("#messageBoard").prepend("<p style='color:white;'>" + data.message + "</p>");
	}
}

function displayCount(count){
	if (data.count === 1){
		text = "There is currently " + data.count + " user.";
	}
	else{
		text = "There are currently " + data.count + " users.";
	}
	$("#num_clients").text(text);
}