chartsApp.directive('annualCalendar',function(){
  return {
    restrict: 'E',
    scope: {data: '='},
    link: function(scope,element,attrs){

      //calendar array
      var calendar = [];

      //yAxis array to store which column month labels will go on
      var yAxis = [];

      //todays date
      var today = new Date(Date.now());

      //last Years date
      var lastYear = addDays(today,-365); //NoTE: addDays to move into chartsApp helpers service

      //initialize column to 0
      var col = 0;

      //get the month of a year ago
      var month = lastYear.getMonth();

      //boolean for first sunday
      var first = true;

      //formatters for yaxis and tool tip
      var yAxisFormatter = d3.time.format("%b");
      var tipFormatter = d3.time.format("%b %e, %Y");

      //for 365 days
      for (i=0; i <= 365; i++){

        //get date as a string
        dateString = lastYear.toJSONLocal();

        //make a UTC (no timezone offset) date
        var date = makeUTCDate(dateString);

        //c is current day of week
        var c = date.getDay();

        //if sunday, if january, and it's the first sunday
        if (c === 0 && date.getMonth() === 0 && first){
          //set month to -1 to allow following if block to run
          month = -1;
          //only do this for the first Sunday
          first = !first;
        }

        //if its sunday and a new month
        if (c === 0 && date.getMonth() > month){
            //add a new object to yAxis indicating the position and month for labeling
            yAxis.push({
              col: col,
              month: yAxisFormatter(date)
            });
            month++;
        }
        //add datum to calendar array including the date, initialized count, and column for positioning
        calendar.push({
          date: date,
          count: 0,
          col: col,
        });

        //add next time through the loop, use the next day and if its a saturday start a new column
        lastYear = addDays(lastYear,1);
        if (c === 6){ col++; }
      }


      //BEGIN D3
      var margin = {top: 70, right: 70, bottom: 70, left: 90}; //margins
      var width = 11 + (53*13); // 1 square + 53 squares with 2px padding
      var height = 11 + 6*13; //1 square + 6 squares with 2px padding
      var legendX = 540; //x Position for legend
      var legendY = height + 10; //y position for legend

      //append svg with a g object accounting for margins
      var svg = d3.select(element[0]).append('svg')
            .attr('width',width + margin.left + margin.right)
            .attr('height',height + margin.top + margin.bottom)
          .append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')');

      //Lazy y-axis from GitHub's commit calendar
      svg.append('text')
        .text('M')
        .style('fill','#ccc')
        .attr('text-anchor','middle')
        .attr('dx','-10')
        .attr('dy','22');

      svg.append('text')
        .text('W')
        .style('fill','#ccc')
        .attr('text-anchor','middle')
        .attr('dx','-10')
        .attr('dy','48');

      svg.append('text')
        .text('F')
        .attr('text-anchor','middle')
        .style('fill','#ccc')
        .attr('dx','-10')
        .attr('dy','74');

      //Prepare Calendar
      svg.selectAll('.cal')
          .data(calendar)
          .enter()
        .append('rect')
          .attr('class','cal')
          .attr('width',11)
          .attr('height',11)
          .attr('x',function(d,i){return d.col*13;})
          .attr('y',function(d,i){return d.date.getDay() * 13;})
          .attr('fill','#eeeeee');

      var colorScale = d3.scale.linear() //based on http://www.perbang.dk/rgbgradient/ from #eee to #FF8C00
            .range(['#F2D5B2','#F6BD77','#FAA43B','#FF8C00']);

      //Prepare y Axis
      svg.selectAll('.y')
          .data(yAxis)
          .enter()
        .append('text')
          .text(function(d){ return d.month;})
          .attr('dy',-5)
          .attr('dx',function(d){
            return d.col*13;
          })
          .attr('fill','#ccc');

      //Prepare Legend
      svg.selectAll('.legend')
          .data(colorScale.range())
          .enter()
        .append('rect')
          .attr('class','legend')
          .attr('width',11)
          .attr('height',11)
          .attr('x',function(d,i){ return legendX + 13 + i*13; })
          .attr('y',legendY)
          .attr('fill',function(d){ return d; });

      svg.append('rect')
        .attr('class','legend')
        .attr('width',11)
        .attr('height',11)
        .attr('x', legendX)
        .attr('y', legendY)
        .attr('fill',"#eee");

      svg.append('text')
        .attr('class','legend')
        .attr('x', legendX - 25)
        .attr('y',legendY + 10)
        .text('Less');

      svg.append('text')
        .attr('class','legend')
        .attr('x', legendX + 5*13)
        .attr('y',legendY + 10)
        .text('More');

      scope.$watch('data',function(newVal,oldVal){
        //if theres no new value (no data), return
        if (!newVal) return;

        //instantiate events object
        var events = {};

        //for each item in array, starting with the last
        var l = newVal.length;
        while(l--){
          //get the day of the event
          var eventDate = newVal[l].event_date.substr(0,10);
          //if the events object doesn't have the current event's day as a key, create a key and give it a value 0
          if(!events[eventDate]){
            events[eventDate] = 0;
          }

          //+1 to event's value
          events[eventDate]++;
        }

        //for every day in the calendar (365)
        for (var i = 0; i < calendar.length; i++) {
          //if current calendars day matches a day key in the events object
          if (events[calendar[i].date.toJSONLocal()]){
            //calendar's count = events count
            calendar[i].count = events[calendar[i].date.toJSONLocal()];
          }
        }

        //calculate min, max excluding 0
        var extent = d3.extent(calendar, function(d){ return d.count === 0 ? null : d.count; });

        //calculate a range of 5 values, starting with min, stopping with max, spaced evenly
        var range = d3.range(extent[0],extent[1]+1,((extent[1]-extent[0])/4));

        //use range as domain
        colorScale.domain(range);

        //Give calendar color based on # events and add tooltip events
        svg.selectAll('.cal')
          .attr('fill',function(d,i){
            if (d.count === 0) return '#eee';
            else{
              return colorScale(d.count);
            }
          })
          .on('mouseover',function(d){
            var xPosition = parseFloat(d3.select(this).attr("x"));
            var yPosition = parseFloat(d3.select(this).attr("y"));

            svg.append('rect')
              .attr('class','tip')
              .attr('x',xPosition - 90)
              .attr('y',yPosition - 60)
              .attr('rx',3)
              .attr('ry',3)
              .attr('width',160)
              .attr('height',50)
              .style({
                'fill': 'rgba(0,0,0,0.9)',
                'border': '2px solid #FFF'
              });


            svg.append('text')
              .text(d.count + " events on " + tipFormatter(d.date))
              .attr('x',xPosition - 85)
              .attr('y',yPosition - 30)
              .style({
                  fill: "#FFF",
                  'font-weight': 'bold',
                  'font-size': '1.2em'
              })
              .attr('class','tip');

          })
          .on('mouseout',function(d){
            svg.selectAll('.tip').remove();
          });
        });

    }
  };
});
