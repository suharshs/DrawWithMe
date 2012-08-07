var w = 1400,
    h = 700,
    z = d3.scale.category20c(),
    i = 0;


var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .style("pointer-events", "all")
    .on("mousemove", sendDrawData);

function particle(x,y) {
  svg.append("svg:circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 1)
      .style("stroke", z(++i))
      .style("stroke-opacity", 1)
}

function sendDrawData(){
  var m = d3.svg.mouse(this);
  ws.send('{"x":' + m[0] + ',"y":' + m[1] + '}');
}