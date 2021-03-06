// This function checks what position the mouse is in.
var MouseDown = false;
$(document).ready(function() {
    $('body').mousedown(function() {
        MouseDown = true;
    })
    .mouseup(function() {
        ws.send('{"message":"resetprev", "sender":' + user_id + '}');
        MouseDown = false;
    });
});

var w = 1000,
    h = 680,
    color = "white";
    i = 0;

function svginit(){
  svg = d3.select("#svghome").append("svg:svg")
      .attr("id", "svg")
      .attr("width", w)
      .attr("height", h)
      .style("pointer-events", "all")
      .style("position", "absolute")
      .on("mousemove", sendDrawData);
}

function getsvgstring(){
  serializer = new XMLSerializer;
  var svg_xml = serializer.serializeToString($("#svg")[0]).replace(/\"/g,'\'');
  messages = $("#messageBoard").children();
  var messages_xml = "";
  for (i=0;i<messages.length;i++){
    messages_xml += serializer.serializeToString(messages[i]);
    if (i > 33) break;
  }
  messages_xml = messages_xml.replace(/\"/g,'\'');
  return '{"svg":"' + svg_xml + '","messages":"' + messages_xml + '"}';
}

function particle(x,y, sender, color) {
  svg.append("svg:circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 1)
      .style("stroke", color)
      .style("stroke-opacity", 1)
      .style("fill", color)
  if (typeof(users[parseInt(sender)].x) === 'number'){
    svg.append("svg:line")
      .attr('x1',users[sender].x)
      .attr('y1',users[sender].y)
      .attr('x2',x)
      .attr('y2',y)
      .style("stroke", color)
      .style("stroke-width", 4);
  }
  users[sender] = {"x":x,"y":y};
}

function sendDrawData(){
  if (MouseDown){
    var m = d3.svg.mouse(this);
    ws.send('{"message":{"x":' + (m[0]) + ',"y":' + (m[1]) + ',"color":"' + color + '"}, "sender":' + user_id + '}');
  }
}

//send the clear message
$("#clear").click(function(){
  ws.send('{"message":"clear", "sender":' + user_id + '}');
});

function clear(){
  d3.selectAll("circle").remove();
  d3.selectAll("line").remove();
}
