chartsApp.directive('annualCalendar',function(){
  return {
    restrict: 'E',
    scope: {data: '='},
    link: function(scope,element,attrs){
      var calendar = [];
      var yAxis = [];
      var today = new Date(Date.now());
      var lastYear = addDays(today,-365);
      var col = 0;
      var month = lastYear.getMonth();
      var x = true;
      var monthFormatter = d3.time.format("%b");
      var tipFormatter = d3.time.format("%b %e, %Y");

      for (i=0; i < 366; i++){
        dateString = lastYear.toJSONLocal();
        var date = makeUTCDate(dateString);
        var c = date.getDay();
        if (c === 0 && date.getMonth() === 0 && x){
          month = -1;
          x = !x;
        }
        if (c === 0 && date.getMonth() > month){
            yAxis.push({
              col: col,
              month: monthFormatter(date)
            });
            month++;
        }
        calendar.push({
          date: date,
          count: 0,
          col: col,
        });
        lastYear = addDays(lastYear,1);
        if (c === 6){ col++; }
      }

      var margin = {top: 70, right: 70, bottom: 70, left: 90};
      var width = 11 + (53*13);
      var height = 11 + 13*6;

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
      svg.selectAll('rect')
        .data(calendar)
        .enter()
      .append('rect')
        .attr('width',11)
        .attr('height',11)
        .attr('x',function(d,i){return d.col*13;})
        .attr('y',function(d,i){return d.date.getDay() * 13;})
        .attr('fill','#eeeeee');

      var colorScale = d3.scale.linear() //based on http://www.colorhexa.com/ff8c00 monochromatic color
            .range(['#ffaf4d','#ff981a','#e67e00','#b36200']);

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


      var minMonth = calendar[0].date.get;

        scope.$watch('data',function(newVal,oldVal){
          if (!newVal) return;

          var events = {};
          var l = newVal.length;
          while(l--){
            var currentDate = newVal[l].event_date.substr(0,10);
            if(!events[currentDate]){
              events[currentDate] = 0;
            }
            events[currentDate]++;
          }

          for (var i = 0; i < calendar.length; i++) {
            if (events[calendar[i].date.toJSONLocal()]){
              calendar[i].count = events[calendar[i].date.toJSONLocal()];
            }
          }

          var extent = d3.extent(calendar, function(d){ return d.count === 0 ? null : d.count; }); //calculate min, max excluding 0
          var range = d3.range(extent[0],extent[1]+1,((extent[1]-extent[0])/4)); //calculate a range of 5 values, starting with min, stopping with max, spaced evenly
          colorScale.domain(range); //use range as domain
          svg.selectAll('rect')
            .attr('fill',function(d,i){
              if (d.count === 0) return '#eee';
              else{
                return colorScale(d.count);
              }
            })
            .on('mouseover',function(d){
              var xPosition = parseFloat(d3.select(this).attr("x"));
              var yPosition = parseFloat(d3.select(this).attr("y"));

              var tooltip = svg.append('rect')
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

              console.log("EVENTS:");
              console.log(events);
              console.log("CALENDAR:");
              console.log(calendar);
              console.log("Y AXIS:");
              console.log(yAxis);
              console.log(yAxis.length);
        });

    }
  };
});
