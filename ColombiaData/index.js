alert("no puede seeeeeeer");
//alert("que pasaaaaa");
//var data = [140, 20, 100];
/*var data = {
  "name":"John",
  "age":30,
  "cars": [
    { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
    { "name":"BMW", "models":[ "320", "X3", "X5" ] },
    { "name":"Fiat", "models":[ "500", "Panda" ] }
  ]
 }*/ 

var data = {a: 9, b: 20, c:30, d:8, e:12};


//alert(Object.values(data));
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10.slice(0, data.length))
//	alert(d3.schemeCategory10.slice(1, 4));

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 90);

var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);
var pie = d3.pie()
    .sort(null)
    .value(function(d) { alert(d) return d; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(Object.values(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data; });
