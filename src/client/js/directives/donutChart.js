chartsApp.directive('donutChart',function(){
  function link(scope,element,attr){
    var height = 500;
    var width = 500;
    var radius = (Math.min(width,height) / 2) - 10;

    var svg = d3.select(element[0]).append('svg');

    svg
      .attr('height', height)
      .attr('width', width)

    var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var colors = [
      {
        pillar: "ZAZEN",
        color: "#98abc5"
      },
      {
        pillar: "WORK",
        color: "#8a89a6"
      },
      {
        pillar: "SOCIAL",
        color: "#7b6888"
      },
      {
        pillar: "LEARN",
        color: "#6b486b"
      },
      {
        pillar: "BIKE",
        color: "#a05d56"
      },
      {
        pillar: "EAT WELL",
        color: "#d0743c"
      },
      {
        pillar: "SLACK",
        color: "#ff8c00"
      }
    ];

    var legend = svg.selectAll(".legend")
      .data(colors)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("y", 350)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", function(d,i){ return d.color; });

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 359)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d.pillar; });

    var arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.9);

    var pie = d3.pie().sort(null)
        .value(function(d){return d.duration;});

    var donut = svg.append('g')
      .attr('transform','translate(' + width/2 + ',' + height/2 + ')');

    function arcTween(a){
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }

    scope.$watch('data',function(data){
      if (!data) return;

      //add all durations
      var sum = 0;
      data.forEach(function(d){
        sum += +d.duration;
      });
      //remove 'no data' if exists
      d3.selectAll('.no-data').remove();
      //if sum of durations = 0 add 'no data' and return
      if (sum === 0) {
          d3.selectAll('path').remove();
          svg.append('text')
            .attr('class','no-data')
            .attr('x',width/2)
            .attr('y',height/2)
            .attr('text-anchor','middle')
            .text('No Data');
          return;
      }

      // bind the data
      var arcs = donut.selectAll('path')
        .data(pie(data));

      // enter
      arcs.enter()
          .append('path')
            .attr('fill',function(d,i){return color(i);})
            .attr('d', arc)
            .each(function(d) {this._current = d;})
            .on('mouseover',function(d){
              svg.append('text')
                .attr('class','details')
                .attr('x',width/2)
                .attr('y',height/2)
                .attr('text-anchor','middle')
                .text("Pillars: " + d.data.pillar);
              svg.append('text')
                .attr('class','details')
                .attr('x',width/2)
                .attr('y',height/2 - 10)
                .attr('text-anchor','middle')
                .text(d.data.duration + " Hrs");
            })
            .on('mouseout',function(d){
              d3.selectAll('.details').remove();
            });

      // update
      arcs.transition().duration(500).ease(d3.easeLinear).attrTween('d',arcTween);
    });
  }
  return {
    restrict: 'E',
    scope: {data: '=data'},
    link: link
  };
});
