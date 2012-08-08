var ws = new WebSocket("ws://localhost:8888/websocket");
var users = {};
ws.onmessage = function(event) {
	var data = $.parseJSON(event.data);
	var message = data.message
	if (data.first === 'True'){
		user_id = data.sender;
		users = data.users;
		displayCount(data.count);
	}
	else if (message === 'resetprev'){
		users[data.sender] = {"x":null,"y":null};
		return;
	}	
	else if (typeof(message.x) === 'number'){
		particle(message.x,message.y, data.sender);
	}
	else{
		if (data.users != undefined){
			users = data.users;
		}
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
	ws.send('{"message":"' + $("#text").val() + '", "sender":' + user_id + '}');
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