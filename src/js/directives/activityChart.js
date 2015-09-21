// define an activity chart directive
chartsApp.directive('activityChart',function(){

  // initialize link function
  function link (scope,element,attr){

    // use D3's margin convention to define SVG
    var margin = {top: 30, right: 35, bottom: 20, left: 35};
    var height = 156 - margin.bottom - margin.top;
    var width = 500 - margin.right - margin.left;

    // append an svg with defined width and margins and append a g element to
    // account add margins
    var svg = d3.select(element[0]).append('svg')
        .attr('height',height + margin.top + margin.bottom)
        .attr('width',width + margin.right + margin.left)
      .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

    // left side bounding line
    svg.append('line')
        .attr('x1',0)
        .attr('x2',0)
        .attr('y1',0)
        .attr('y2',height-15)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('class','activitybound');

    // top side bounding line
    svg.append('line')
        .attr('x1',0)
        .attr('x2',width)
        .attr('y1',0)
        .attr('y2',0)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('class','activitybound');

    // right side bounding line
    svg.append('line')
        .attr('x1',width)
        .attr('x2',width)
        .attr('y1',0)
        .attr('y2',height-15)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('class','activitybound');

    // define an array of objects which relate each pillar to a color
    // (possibly define as Angular constant)
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

    // append g elements for each pillar, each with an index-based offset
    var legend = svg.selectAll(".legend")
      .data(colors)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" + i * 65 + ",0)"; });

    // append rects to each .legend g element with fill defined in colors array
    legend.append("rect")
        .attr("x", 0)
        .attr("y", -30)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", function(d,i){ return d.color; });

    // append text to each element with text pillar name in colors array
    legend.append("text")
        .attr("x", 10)
        .attr("y", -20)
        .attr("dy", ".35em")
        // .style("text-anchor", "end")
        .text(function(d) { return d.pillar; });

    // create an x-scale with range from 0 to width
    var xScale = d3.time.scale()
        .range([0,width]);

    // x-axis for hours of the day with format "HH (AM/PM)"
    var hourAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(d3.time.format('%I %p'));

    // x-axis for date with format MM/DD/YYYY
    var dateAxis = d3.svg.axis()
        .scale(xScale)
        .tickPadding(20)
        .tickFormat(function(d){ //only 12AM gets date label
          var formatter;
          if(d.getHours() === 0){
            formatter =  d3.time.format('%x');
          }
          else{
            return null;
          }
          return formatter(d);
        });

    // watch for update to data attribute on directive
    scope.$watch('data',function(data){

      // if there isn't any data, return.
      if (!data) return;

      // remove any existing axis labels
      d3.selectAll('.activityaxis').remove();

      // create a Date object with UTC from data's start date
      var startDay = makeUTCDate(new Date (data[0].event_date.substr(0,10)));

      // compute an end date as the start date +1 day.
      var endDay = addDays(startDay,1);

      //bind bars for chart to the incoming data
      var bars = svg.selectAll('.bar').data(data);

      // define x-scales domain
      xScale
        .domain([startDay,endDay]);

      // append a g element for the hour x-axis and call hourAxis function
      // to build the axis
      svg.append('g')
        .attr('class','activityaxis')
        .attr('transform','translate(0' + ',' + (height-15) + ')')
        .call(hourAxis);

      // append a g element for the date x-axis and call dateAxis function
      // to build the axis
      svg.append('g')
        .attr('class','activityaxis')
        .attr('transform','translate(0' + ',' + (height-15) + ')')
        .call(dateAxis);

      // for each new element with unbound data append a rect
      bars.enter()
        .append('rect')

        // give rect .bar class so it can be selected exclusively
        .attr('class','bar')

        // define height
        .attr('height',90)

        // define width based on duration
        .attr('width',function(d){

          //make event_date string into a date starting at T00:00:00
          var durationy = makeUTCDate(d.event_date.substr(0,10));

          //convert duration to a date object for xScale
          durationy = durationy.addMinutes(durationToMinutes(d.duration));

          //apply xscale to duration date object to caluclate rect's width
          return xScale(durationy);

        })

        // define x and y relative to the date, time of day and height;
        // respectively
        .attr('y',height-105)
        .attr('x',function(d){return xScale(new Date(d.event_date));})

        // define fill
        .attr('fill',function(d){ //color determined by pillar name
          if (d.pillar == "ZAZEN"){
            return "#98abc5";
          }
          else if (d.pillar == "WORK") {
            return "#8a89a6";
          }
          else if (d.pillar == "SOCIAL") {
            return "#7b6888";
          }
          else if (d.pillar == "LEARN") {
            return "#6b486b";
          }
          else if (d.pillar == "BIKE") {
            return "#a05d56";
          }
          else if (d.pillar == "EAT WELL") {
            return "#d0743c";
          }
          else if (d.pillar == "SLACK") {
            return "#ff8c00";
          }
        })

        // when this rect is moused over bind datum to selected attribute so
        // that it metadata can be viewed in view
        .on('mouseover',function(d){
          scope.$apply(function(){
            scope.selected = d;
          });
        })

        // when rect is moused out un-bind datum
        .on('mouseout',function(){
          scope.$apply(function(){
            scope.selected = null;
          });
        });

      // for all the rects with .bar class, remove
      bars.exit().remove();

      //update already existing bars
      bars.transition().attr('width',function(d){

        // make event_date string into a date starting at T00:00:00
        var durationy = makeUTCDate(d.event_date.substr(0,10));

        // convert duration to a date object for xScale
        durationy = durationy.addMinutes(durationToMinutes(d.duration));

        return xScale(durationy);
      })
      .transition().attr('fill',function(d){ //color determined by pillar name
        if (d.pillar == "ZAZEN"){
          return "#98abc5";
        }
        else if (d.pillar == "WORK") {
          return "#8a89a6";
        }
        else if (d.pillar == "SOCIAL") {
          return "#7b6888";
        }
        else if (d.pillar == "LEARN") {
          return "#6b486b";
        }
        else if (d.pillar == "BIKE") {
          return "#a05d56";
        }
        else if (d.pillar == "EAT WELL") {
          return "#d0743c";
        }
        else if (d.pillar == "SLACK") {
          return "#ff8c00";
        }
      })
      .transition().attr('x',function(d){return xScale(new Date(d.event_date));});

    });
  }

  // return the directive definition object with restriction that it can only
  // be used as an element, with two-way data binding on the scope for both
  // data and selected attrs with link function defined above.
  return {
    restrict: 'E',
    scope: {data: '=data', selected: '='},
    link: link
  };
});
