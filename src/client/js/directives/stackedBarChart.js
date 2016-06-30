chartsApp.directive('stackedBarChart',function(){
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

    //Boilerplate chart append
    var chart = d3.select(element[0]).append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]); //http://bl.ocks.org/mbostock/3886208

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

      console.log("RESONSE");
      console.log(response);

      //remove pre-existing axes
      d3.selectAll('.x.axis').remove();
      d3.selectAll('.g').remove();

      var curDate = response[0].event_date.substr(0,10);
      var count = 0;
      var zazenHours = new Date("1990-09-13T00:00:00");
      var workHours = new Date("1990-09-13T00:00:00");
      var socialHours = new Date("1990-09-13T00:00:00");
      var learnHours = new Date("1990-09-13T00:00:00");
      var bikeHours = new Date("1990-09-13T00:00:00");
      var eatwellHours = new Date("1990-09-13T00:00:00");
      var slackHours = new Date("1990-09-13T00:00:00");
      var dates = [];
      response.forEach(function(item){
        //if item is current day
        if (item.event_date.substr(0,10) === curDate){
          //add 1 to the event counter
          count++;
          //add duration to the
          if(item.pillar === "ZAZEN"){                                                  //candidate for improvement
            zazenHours = zazenHours.addMinutes(durationToMinutes(item.duration));       //simplify this if..else structure
          }                                                                             //or do away with it completely
          else if(item.pillar === "WORK"){
            workHours = workHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "SOCIAL"){
            socialHours = socialHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "LEARN"){
            learnHours = learnHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "BIKE"){
            bikeHours = bikeHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "EAT WELL"){
            eatwellHours = eatwellHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "SLACK"){
            slackHours = slackHours.addMinutes(durationToMinutes(item.duration));
          }

        }
        //if item isn't the current day
        else {
          dates.push({
            date: makeUTCDate(curDate),
            events: count,
            duration: {
              zazen: zazenHours,
              work: workHours,
              social: socialHours,
              learn: learnHours,
              bike: bikeHours,
              eatwell: eatwellHours,
              slack: slackHours
            }
          });
          count = 1;
          curDate = item.event_date.substr(0,10);
          zazenHours = new Date("1990-09-13T00:00:00");
          workHours = new Date("1990-09-13T00:00:00");
          socialHours = new Date("1990-09-13T00:00:00");
          learnHours = new Date("1990-09-13T00:00:00");
          bikeHours = new Date("1990-09-13T00:00:00");
          eatwellHours = new Date("1990-09-13T00:00:00");
          slackHours = new Date("1990-09-13T00:00:00");
          if(item.pillar === "ZAZEN"){
            zazenHours = zazenHours.addMinutes(durationToMinutes(item.duration));  //candidate for improvement, same as above
          }
          else if(item.pillar === "WORK"){
            workHours = workHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "SOCIAL"){
            socialHours = socialHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "LEARN"){
            learnHours = learnHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "BIKE"){
            bikeHours = bikeHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "EAT WELL"){
            eatwellHours = eatwellHours.addMinutes(durationToMinutes(item.duration));
          }
          else if(item.pillar === "SLACK"){
            slackHours = slackHours.addMinutes(durationToMinutes(item.duration));
          }
        }
      });

      console.log("DATES@141");
      console.log(dates);

      dates.push({
        date: makeUTCDate(curDate),
        events: count,
        duration: {
          zazen: zazenHours,
          work: workHours,
          social: socialHours,
          learn: learnHours,
          bike: bikeHours,
          eatwell: eatwellHours,
          slack: slackHours
        }
      });

      /////////////////////
      // BEGIN D3 /////////
      /////////////////////

      //Convert each duration to hours.minutes format
      dates.forEach(function(item){
        for(var key in item.duration){
          item.duration[key+"hDM"] = item.duration[key].toHoursDotMinutes();
        }
      });

      console.log("DATES@169");
      console.log(dates);

      //Set minimum and maximum date for input domain
      var minDate = dates[0].date;
      var maxDate = dates[dates.length-1].date;

      // candidates for improvement...
      // explain why I'm using .utc()
      if (dates.length < 7){
        xScale.domain([minDate,d3.time.day.utc.offset(maxDate,1 + ( 7 - dates.length))]);
      }
      else{
        xScale.domain([minDate,d3.time.day.utc.offset(maxDate,1)]);
      }

      var xAxis = d3.svg.axis()
                    .orient("top")
                    .ticks(d3.time.days,1)
                    .tickFormat(d3.time.format('%a, %m/%d'))
                    .scale(xScale);

      var barWidth = width / dates.length;

      if (dates.length < 7){
        barWidth = width / (dates.length + (7-dates.length));
      }

      //set domain of color to be duration names that do not contain hDM
      // key.indexOf("hDM") returns -1 if "hDM" is not in string
      color.domain(d3.keys(dates[0].duration).filter(function(key) {  return key.indexOf("hDM") === -1; }));

      //calculate y positions for data
      dates.forEach(function(d) {
        var y0 = 0;
        d.duration.pillars = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d.duration[name+ "hDM"], duration: d.duration[name]}; });
        d.total = d.duration.pillars[d.duration.pillars.length - 1].y1;
      });


      //Append x axis
      chart.append("g")
            .attr("class", "x axis")   // give it a class so it can be used to select only xaxis labels  below
            .attr("transform", "translate(0,-1)")
            .call(xAxis);

      var dateBars = chart.selectAll(".dateBar")
        .data(dates);


      dateBars.enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + xScale(d.date) + ",0)"; });

      var singleBar = dateBars.selectAll("rect")
          .data(function(d) { return d.duration.pillars; });

      singleBar.enter().append("rect")
        .attr("width", barWidth-1)
        .attr("y", function(d) { return yScale(d.y0); })
        .attr("height", function(d) {
          return yScale(d.y1) - yScale(d.y0); })
        .style("fill", function(d) { return color(d.name); })
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
          .text("Pillar: " + d.name + " Duration: " + d.duration.toChartDurationFormat());
        })
        .on("mouseout", function(d) {
          d3.select(this)
          .transition()
          .duration(250)
          .style("fill", function(d) { return color(d.name); });
          d3.select("#tooltip").remove();
        });


      var legend = chart.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });



      legend.append("rect")
          .attr("x", width - 18)
          .attr("y", 350)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 359)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

      $(".x.axis").children("g").last().remove(); //fix to remove final label of x axis
    });
  }
  return {
    restrict: 'E',
    scope: {data: '=data'},
    link: link
  };
});
