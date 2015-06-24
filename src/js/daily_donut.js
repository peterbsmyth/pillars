var isX = true;

var x = [10,20,70,40,50,60,30];
var y = [10,40,30,60,80,10,20];
var data = x;

var height = 500;
var width = 500;
var radius = Math.min(width,height) / 2;

var svg = d3.select('.donut').append('svg');

svg
  .attr({
    'height': height,
    'width': width
  });

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
  .innerRadius(radius * 0.5)
  .outerRadius(radius * 0.9);

var pie = d3.layout.pie().sort(null);


var donut = svg.append('g')
  .attr('transform','translate(' + width/2 + ',' + height/2 + ')');

var arcs = donut.selectAll('path')
  .data(pie(data))
  .enter()
    .append('path')
      .attr('fill',function(d,i){return color(i);})
      .each(function(d) {this._current = d;});

arcs.data(pie(data)).attr('d',arc);

function arcTween(a){
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

function update(){
  isX = !isX;

  if(isX){
    data = x;
  }
  else {
    data = y;
  }

  arcs.data(pie(data)).transition().duration(500).ease('linear').attrTween('d',arcTween);

}


setInterval(update,2000);