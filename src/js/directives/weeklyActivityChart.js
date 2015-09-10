chartsApp.directive('weeklyActivityChart',function(){
  function link (scope,element,attrs){

    //Conventional D3 Margin
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
                width = 970 - margin.left - margin.right,
                height = 530 - margin.top - margin.bottom;

    var yScale = d3.scale.linear()
                  .domain([0,24])
                  .range([0,height]);

    var xScale = d3.time.scale.utc()
                  .range([0,width]);

    var yAxis = d3.svg.axis()
                  .orient("left")
                  .ticks(24)
                  .scale(yScale);

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
        pillar: "BIKE",
        color: "#6b486b"
      },
      {
        pillar: "LEARN",
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

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Append y axis
    chart.append("g")
          .attr("class", "y axis")   // give it a class so it can be used to select only yaxis labels  below
          .attr("transform", "translate(-1,0)")
          .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("x",-455)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Hours");

    scope.$watch('data',function(response){
      if (!response) return;

      //remove pre-existing axes
      d3.selectAll('.x.axis').remove();
      d3.selectAll('.g').remove();

      //prepare data

      var data = d3.nest()
        .key(function(d){
        return d.event_date.substr(0,10);
        })
        .entries(response)
        .map(function(d,i){
          d.values.forEach(function(item){
            //Convert each duration to hours.minutes format
            item.durationhDM = item.duration.toHoursDotMinutes();
            //Calculate y0 and y1 for event
            item.y0 = getY0(item.event_date);
            item.y1 = item.y0 + item.durationhDM;
          });

          return {
            date: makeUTCDate(d.key),
            events: d.values
          };
        });

      // Using d3.map ...interesting approach and its promising however it
      //doesnt return array but an object, making it not useful for .data()

      // var  data = d3.nest()
      //     .key(function(d){
      //     return d.event_date.substr(0,10);
      //     })
      //     .map(response, d3.map);

      /////////////////////
      // BEGIN D3 /////////
      /////////////////////

      //Set minimum and maximum date for input domain
      var minDate = data[0].date;
      var maxDate = data[data.length-1].date;

      // candidates for improvement...
      // explain why I'm using .utc()
      if (data.length < 7){
        xScale.domain([minDate,d3.time.day.utc.offset(maxDate,1 + ( 7 - data.length))]);
      }
      else{
        xScale.domain([minDate,d3.time.day.utc.offset(maxDate,1)]);
      }

      var xAxis = d3.svg.axis()
                    .orient("top")
                    .ticks(d3.time.days,1)
                    .tickFormat(d3.time.format('%a, %m/%d'))
                    .scale(xScale);

      var barWidth = width / data.length;

      if (data.length < 7){
        barWidth = width / (data.length + (7-data.length));
      }

      //Append x axis
      chart.append("g")
            .attr("class", "x axis")   // give it a class so it can be used to select only xaxis labels  below
            .attr("transform", "translate(0,-1)")
            .call(xAxis);

      var dateBars = chart.selectAll(".dateBar")
        .data(data);


      dateBars.enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + xScale(d.date) + ",0)"; });

      var singleBar = dateBars.selectAll("rect")
          .data(function(d) { return d.events; });

      singleBar.enter().append("rect")
        .attr("width", barWidth-1)
        .attr("y", function(d) { return yScale(d.y0); })
        .attr("height", function(d) {return yScale(d.y1) - yScale(d.y0); })
        .style('fill',function(d){ //color determined by pillar name
          for (var i = 0; i < colors.length; i++){
            if (d.pillar == colors[i].pillar){
              return colors[i].color;
            }
          }
        })
        .on('mouseover', function(d){
          d3.select(this)
          .style("fill", "orange");
          chart.append("text")
          .attr("id", "tooltip")
          .attr("x", 450)
          .attr("y", height)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "15px")
          .attr("font-weight", "bold")
          .attr("fill", "black")
          .text("Pillar: " + d.pillar + " Duration: " + d.duration);
        })
        .on("mouseout", function(d) {
          d3.select(this)
          .transition()
          .duration(250)
          .style('fill',function(d){ //color determined by pillar name
            for (var i = 0; i < colors.length; i++){
              if (d.pillar == colors[i].pillar){
                return colors[i].color;
              }
            }
          });
          d3.select("#tooltip").remove();
        });


      var legend = chart.selectAll(".legend")
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

      // chart.append("rect")
      //      .attr("x", width - 18)
      //      .attr("y", 350)
      //      .attr("width", 18)
      //      .attr("height", 18)
      //      .style("fill", function());

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 359)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d.pillar; });

      $(".x.axis").children("g").last().remove(); //fix to remove final label of x axis
    });
  }
  return {
    restrict: 'E',
    scope: {data: '='},
    link: link
  };
});
