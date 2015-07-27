chartsApp.directive('annualCalendar',function(){
  return {
    restrict: 'E',
    scope: {data: '='},
    link: function(scope,element,attrs){
      var array = [];
      var today = new Date(Date.now());
      for (i=0; i < 366; i++){
        array.unshift(today);
        today = addDays(today,-1);
      }
      console.log(array);

      var width = 11 + (365*13);
      var height = 11;

      var svg = d3.select(element[0]).append('svg')
            .attr('width',width)
            .attr('height',height)
          .append('g');

      svg.selectAll('rect')
        .data(array)
        .enter()
      .append('rect')
        .attr('width',11)
        .attr('height',11)
        .attr('x',function(d,i){return i*13;})
        .attr('fill','#eeeeee');


    }
  };
});
