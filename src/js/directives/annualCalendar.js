chartsApp.directive('annualCalendar',function(){
  return {
    restrict: 'E',
    scope: {data: '='},
    link: function(scope,element,attrs){
      var calendar = [];
      var today = new Date(Date.now());
      for (i=0; i < 366; i++){
        dateString = today.toJSONLocal();
        calendar.unshift({
          date: dateString,
          count: 0
        });
        today = addDays(today,-1);
      }

      var width = 11 + (365*13);
      var height = 11;

      var svg = d3.select(element[0]).append('svg')
            .attr('width',width)
            .attr('height',height)
          .append('g');

      svg.selectAll('rect')
        .data(calendar)
        .enter()
      .append('rect')
        .attr('width',11)
        .attr('height',11)
        .attr('x',function(d,i){return i*13;})
        .attr('fill','#eeeeee');

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
            if (events[calendar[i].date]){
              calendar[i].count = events[calendar[i].date];
            }
          }

          // var data = d3.nest()
          //     .key(function(d){
          //       return d.event_date.substr(0,10);
          //     })
          //     .rollup(function(v){
          //       return v.length;
          //     })
          //     .entries(newVal);
              console.log("EVENTS:");
              console.log(events);
              console.log("CALENDAR:");
              console.log(calendar);
        });

    }
  };
});
