chartsApp.directive('activityChart',function(){
  function link (scope,element,attr){

    var margin = {top: 20, right: 35, bottom: 20, left: 35};
    var height = 156 - margin.bottom - margin.top;
    var width = 500 - margin.right - margin.left;

    var svg = d3.select(element[0]).append('svg')
        .attr('height',height + margin.top + margin.bottom)
        .attr('width',width + margin.right + margin.left)
      .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

    //left side bounding line
    svg.append('line')
        .attr('x1',0)
        .attr('x2',0)
        .attr('y1',0)
        .attr('y2',height-15)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('class','activitybound');

    //top side bounding line
    svg.append('line')
        .attr('x1',0)
        .attr('x2',width)
        .attr('y1',0)
        .attr('y2',0)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('class','activitybound');

    //right side bounding line
    svg.append('line')
        .attr('x1',width)
        .attr('x2',width)
        .attr('y1',0)
        .attr('y2',height-15)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('class','activitybound');

    var xScale = d3.time.scale()
        .range([0,width]);

    var hourAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(d3.time.format('%I %p'));

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

    scope.$watch('data',function(data){
      if (!data) return;

      d3.selectAll('.activityaxis').remove();

      var startDay = makeUTCDate(new Date (data[0].event_date.substr(0,10)));

      var endDay = addDays(startDay,1);

      var bars = svg.selectAll('rect').data(data);

      xScale
        .domain([startDay,endDay]);

      svg.append('g')
        .attr('class','activityaxis')
        .attr('transform','translate(0' + ',' + (height-15) + ')')
        .call(hourAxis);

      svg.append('g')
        .attr('class','activityaxis')
        .attr('transform','translate(0' + ',' + (height-15) + ')')
        .call(dateAxis);

      bars.enter()
        .append('rect')
        .attr('height',100)
        .attr('width',function(d){
          //make event_date string into a date starting at T00:00:00
          var durationy = makeUTCDate(d.event_date.substr(0,10));
          //convert duration to a date object for xScale
          durationy = durationy.addMinutes(durationToMinutes(d.duration));
          return xScale(durationy);
        })
        .attr('y',height-115)
        .attr('x',function(d){return xScale(new Date(d.event_date));})
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
        .on('mouseover',function(d){
          scope.$apply(function(){
            scope.selected = d;
          });
        })
        .on('mouseout',function(){
          scope.$apply(function(){
            scope.selected = null;
          });
        });

      bars.exit().remove();

      //update
      bars.transition().attr('width',function(d){
        //make event_date string into a date starting at T00:00:00
        var durationy = makeUTCDate(d.event_date.substr(0,10));
        //convert duration to a date object for xScale
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
  return {
    restrict: 'E',
    scope: {data: '=data', selected: '='},
    link: link
  };
});
