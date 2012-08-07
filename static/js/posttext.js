var ws = new WebSocket("ws://localhost:8888/websocket");
ws.onmessage = function(event) {
	var data = $.parseJSON(event.data)
	if (data.message === 'resetprev'){
		prev = {"x":null,"y":null};
		return;
	}
	try{
		message = $.parseJSON(data.message);
		particle(message.x,message.y);
	}
	catch(err){
		displayMessage(data.message);
		displayCount(data.count);
	}
};
// Allow enter to also do the submit
$('#text').keypress(function(event){
	if (event.keyCode == 13){
		event.preventDefault();
		postText();
	}
});

function postText(){
	ws.send($("#text").val());
	$("#text").val('')
}

function displayMessage(message){
	if (message !== ""){
		$("#messageBoard").prepend("<p style='color:white;'>" + message + "</p>");
	}
}

function displayCount(count){
	if (count === 1){
		text = count + " user online.";
	}
	else{
		text = count + " users online.";
	}
	$("#num_clients").text(text);
}