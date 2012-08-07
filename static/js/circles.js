// This function checks what position the mouse is in.
var MouseDown = false
$(document).ready(function() {
    $('body').mousedown(function() {
        MouseDown = true;
    })
    .mouseup(function() {
        ws.send('resetprev')
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

function particle(x,y) {
  svg.append("svg:circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 1)
      .style("stroke", z(++i))
      .style("stroke-opacity", 1)
  if (prev.x !== null){
    svg.append("svg:line")
      .attr('x1',prev.x)
      .attr('y1',prev.y)
      .attr('x2',x)
      .attr('y2',y)
      .style("stroke", z(i))
      .style("stroke-width", 3);
  }
  prev = {"x":x,"y":y};
}

function sendDrawData(){
  if (MouseDown){
    var m = d3.svg.mouse(this);
    ws.send('{"x":' + m[0] + ',"y":' + m[1] + '}');
  }
}