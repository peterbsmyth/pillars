chartsApp.directive('lineChart',function(){
  function link (scope,element,attrs){

    //Conventional D3 Margin
    var margin = {top: 10, right: 10, bottom: 50, left: 40};

    var height = 600 - margin.top - margin.bottom;
    var width = 1100 - margin.left - margin.right;

    var chart = d3.select(element[0]).append('svg')
                  .attr('height',height + margin.top + margin.bottom)
                  .attr('width',width + margin.left + margin.right)
                .append('g')
                  .attr('transform','translate('+margin.left+','+margin.top+')');

    var xScale = d3.time.scale()
                  .range([0,width]);

    var yScale = d3.scale.linear()
                  .range([height,0]);

    var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');

    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient('left');

    var line = d3.svg.line()
                 .x(function(d){return xScale(parseDate(d.key));})
                 .y(function(d){return yScale(d.values);});

    var parseDate = d3.time.format('%Y-%m-%d').parse;

    scope.$watch('data',function(response){
      if (!response) return;

      $("svg>g").children().remove();

      var nestedData = d3.nest()
          .key(function(d){
            return d.event_date.substr(0,10);
          })
          .rollup(function(v){
            return d3.sum(v,function(e){
              return durationToMinutes(e.duration);
            });
          })
          .entries(response);

      response.forEach(function(d){
        // debugger;
        d.event_date = d.event_date.substr(0,10);
        d.event_date = parseDate(d.event_date);
        d.duration = durationToMinutes(d.duration);
      });

      xScale.domain(d3.extent(nestedData, function(d){ return parseDate(d.key);}));
      yScale.domain([0,d3.max(nestedData, function(d){return d.values;})+5]);
      console.log();
      chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

      chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

      chart.append("path")
          .datum(nestedData)
          .attr("class", "line")
          .attr("d", line);

      chart.selectAll('circle')
          .data(nestedData)
          .enter()
        .append('circle')
          .attr('r',3)
          .attr('cx',function(d){
            // debugger;
            return xScale(parseDate(d.key));})
          .attr('cy',function(d){return yScale(d.values);});
          // .attr('fill',function(d){
          //   if(d.quality == "WRENCH"){return 'red';}
          //   else if(d.quality == "YAY"){return 'green';}
          // })
          // .on('mouseover', function(d){
          //   d3.select(this)
          //   .style("fill", "orange");
          //   // chart.append("text")
          //   // .attr("id", "tooltip")
          //   // .attr("x", 450)
          //   // .attr("y", height+40)
          //   // .attr("text-anchor", "middle")
          //   // .attr("font-family", "sans-serif")
          //   // .attr("font-size", "15px")
          //   // .attr("font-weight", "bold")
          //   // .attr("fill", "orange")
          //   // .text("Pillar: " + d.pillar + " Duration: " + d.duration + " Notes: " + d.notes + " Date: " + d.event_date);
          // })
          // .on("mouseout", function(d) {
          //   d3.select(this)
          //   .transition()
          //   .duration(250)
          //   .style("fill", function(d) {
          //     if(d.quality == "WRENCH"){return 'red';}
          //     else if(d.quality == "YAY"){return 'green';}
          //     else {
          //       return 'black';
          //     }
          //   });
          //   d3.select("#tooltip").remove();
          // });
      console.log("RESPONSE");
      console.log(response);
    });
  }
  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
