var donutApp = angular.module('donutApp',[]);

donutApp.controller('DonutCtrl',['$scope','$http',function($scope,$http){
  $scope.today = new Date(Date.now());
  var todayJSON = $scope.today.toJSONLocal();

  $http.get('functions.php?content=dayCumulativeDuration&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59').success(function(data){
    $scope.donutData = data;
  });

  $scope.update = function(){
    var prevDay = addDays($scope. today,-1);
    $scope.today = prevDay;
    todayJSON = $scope.today.toJSONLocal();
    $http.get('functions.php?content=dayCumulativeDuration&startDay='+todayJSON+'&endDay='+todayJSON+'T23%3A59%3A59').success(function(data){
      $scope.donutData = data;
    });
  };
}]);

donutApp.directive('donutChart',function(){
  function link(scope,element,attr){
    var height = 500;
    var width = 500;
    var radius = Math.min(width,height) / 2;

    var svg = d3.select(element[0]).append('svg');

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

    var pie = d3.layout.pie().sort(null)
        .value(function(d){

          return d.duration;});

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
      // bind the data
      var arcs = donut.selectAll('path')
        .data(pie(data));

      // enter
      arcs.enter()
          .append('path')
            .attr('fill',function(d,i){return color(i);})
            .attr('d', arc)
            .each(function(d) {this._current = d;});

      // update
      arcs.transition().duration(500).ease('linear').attrTween('d',arcTween);
    });
  }
  return {
    restrict: 'E',
    scope: {data: '=data'},
    link: link
  };
});
