var ws = new WebSocket("ws://" + window.location.host + "/websocket");
var users = {};
ws.onmessage = function(event) {
	var data = $.parseJSON(event.data);
	var message = data.message;
	if (data["type"] === 'first'){
		user_id = data.sender;
		users = data.users;
		displayCount(data.count);
		if (data.count < 2){
			svginit();
		}
	}
	else if (data['type'] == 'init'){
		$("#svghome").append(message["svg"]);
		$("#messageBoard").append(message['messages']);
		svg = d3.select("#svg").on("mousemove", sendDrawData);
	}
	else if (message === 'returnsvg'){
		ws.send('{"message":' + getsvgstring() + ', "type":"init", "sender":'+ data.sender +'}');
	}
	else if (message === 'resetprev'){
		users[data.sender] = {"x":null,"y":null};
		return;
	}
	else if (message === 'clear'){
		clear();
	}
	else if (message === 'clearmessages'){
		clearmessages();
	}
	else if (typeof(message.x) === 'number'){
		particle(message.x,message.y, data.sender, message.color);
	}
	else{
		if (data.users !== undefined){
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
	$("#text").val('');
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

//send the clearmessages message
$("#clearmessages").click(function(){
  ws.send('{"message":"clearmessages", "sender":' + user_id + '}');
});

function clearmessages(){
	$("#messageBoard").children().remove();
}
