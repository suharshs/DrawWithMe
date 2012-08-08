// This function checks what position the mouse is in.
var MouseDown = false
$(document).ready(function() {
    $('body').mousedown(function() {
        MouseDown = true;
    })
    .mouseup(function() {
        ws.send('{"message":"resetprev", "sender":' + user_id + '}')
        MouseDown = false;
    });
});

var prev = {"x":null,"y":null};

var w = 1200,
    h = 720,
    z = d3.scale.category20c(),
    i = 0;


var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .style("pointer-events", "all")
    .style("position", "absolute")
    .style("left", 270)
    .style("top", 100)
    .style("border-left-style", "dotted")
    .style("border-left-width", "1px")
    .style("border-left-color", "white")
    .style("border-top-style", "dotted")
    .style("border-top-width", "1px")
    .style("border-top-color", "white")
    .on("mousemove", sendDrawData);

function particle(x,y, sender) {
  svg.append("svg:circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 1)
      .style("stroke", z(++i))
      .style("stroke-opacity", 1)
  if (typeof(users[parseInt(sender)].x) === 'number'){
    svg.append("svg:line")
      .attr('x1',users[sender].x)
      .attr('y1',users[sender].y)
      .attr('x2',x)
      .attr('y2',y)
      .style("stroke", z(i))
      .style("stroke-width", 3);
  }
  users[sender] = {"x":x,"y":y};
}

function sendDrawData(){
  if (MouseDown){
    var m = d3.svg.mouse(this);
    ws.send('{"message":{"x":' + (m[0]+270/12) + ',"y":' + (m[1]+100/12) + '}, "sender":' + user_id + '}');
  }
}