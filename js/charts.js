//for initializing chart with Previous Week's Data
var today = new Date(Date.now());
today.setDate(today.getDate() - 6);
var startChart = today.toJSONLocal();

var setTitle = function(selectedDate){
  var startDay = selectedDate;
  var endDay = makeUTCDate(startDay);
  endDay = addDays(endDay,6).toJSONLocal();
  return "Pillars For " + selectedDate.toDateFormat() + " - " + endDay.toDateFormat();
}

var buildChart = function(selectedDate){
  //Build Data String
  var startDay = selectedDate;
  // debugger;
  var endDay = makeUTCDate(startDay);
  endDay = addDays(endDay,6).toJSONLocal() + "T23:59:59";
  var data = {content : "pillarsLog", startDay: startDay, endDay: endDay};

  $.ajax({
    type: "GET",
    url: "functions.php",
    data: data,
    dataType: "json",
    success: function(response){
      console.log(response);
      //set variables for first item
      var curDate = response[0].event_date.substr(0,10);
      var count = 0;
      var zazenHours = makeUTCDate("1990-09-13T00:00:00");
      var workHours = makeUTCDate("1990-09-13T00:00:00");
      var socialHours = makeUTCDate("1990-09-13T00:00:00");
      var learnHours = makeUTCDate("1990-09-13T00:00:00");
      var bikeHours = makeUTCDate("1990-09-13T00:00:00");
      var eatwellHours = makeUTCDate("1990-09-13T00:00:00");
      var slackHours = makeUTCDate("1990-09-13T00:00:00");
      var dates = [];
      response.forEach(function(item){
        //if item is current day
        if (item.event_date.substr(0,10) === curDate){
          //add 1 to the event counter
          count++;
          //add duration to the
          if(item.pillar === "ZAZEN"){
            zazenHours = addMinutes(zazenHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "WORK"){
            workHours = addMinutes(workHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "SOCIAL"){
            socialHours = addMinutes(socialHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "LEARN"){
            learnHours = addMinutes(learnHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "BIKE"){
            bikeHours = addMinutes(bikeHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "EAT WELL"){
            eatwellHours = addMinutes(eatwellHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "SLACK"){
            slackHours = addMinutes(slackHours,durationToMinutes(item.duration));
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
          zazenHours = makeUTCDate("1990-09-13T00:00:00");
          workHours = makeUTCDate("1990-09-13T00:00:00");
          socialHours = makeUTCDate("1990-09-13T00:00:00");
          learnHours = makeUTCDate("1990-09-13T00:00:00");
          bikeHours = makeUTCDate("1990-09-13T00:00:00");
          eatwellHours = makeUTCDate("1990-09-13T00:00:00");
          slackHours = makeUTCDate("1990-09-13T00:00:00");
          if(item.pillar === "ZAZEN"){
            zazenHours = addMinutes(zazenHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "WORK"){
            workHours = addMinutes(workHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "SOCIAL"){
            socialHours = addMinutes(socialHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "LEARN"){
            learnHours = addMinutes(learnHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "BIKE"){
            bikeHours = addMinutes(bikeHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "EAT WELL"){
            eatwellHours = addMinutes(eatwellHours,durationToMinutes(item.duration));
          }
          else if(item.pillar === "SLACK"){
            slackHours = addMinutes(slackHours,durationToMinutes(item.duration));
          }
        }
      });


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

      // console.log(dates);

      /////////////////////
      // BEGIN D3 /////////
      /////////////////////

      //Convert each duration to hours.minutes format
      dates.forEach(function(item){
        for(var key in item.duration){
          item.duration[key+"hDM"] = item.duration[key].toHoursDotMinutes();
        }
      });

      //Conventional D3 Margin
      var margin = {top: 20, right: 30, bottom: 30, left: 40},
                  width = 970 - margin.left - margin.right,
                  height = 530 - margin.top - margin.bottom;

      //Set minimum and maximum date for input domain
      var minDate = dates[0].date;
      var maxDate = dates[dates.length-1].date;

      var xScale = d3.time.scale.utc()
                    .domain([minDate,d3.time.day.utc.offset(maxDate,1)])
                    .range([0,width]);

      var yScale = d3.scale.linear()
                    .domain([0,24])
                    .range([0,height]);

      var xAxis = d3.svg.axis()
                    .orient("top")
                    .ticks(d3.time.days.utc,1) //I don't understand how this works. *Magically* displays domain days
                    // .ticks(d3.time.days,1) //I don't understand how this works. *Magically* displays domain days
                    .tickFormat(d3.time.format('%a, %m/%d'))
                    .scale(xScale);

      var yAxis = d3.svg.axis()
                    .orient("left")
                    .ticks(24)
                    .scale(yScale);

      var barWidth = width / dates.length;

      var color = d3.scale.ordinal()
                  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]); //http://bl.ocks.org/mbostock/3886208

      var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Pillar:</strong> <span>" + d.name + "</span><br><strong>Duration:</strong>" + "<span>" + d.duration.toDurationFormat() + "</span>";
            })

      //set domain of color to be duration names that do not contain hDM
      // key.indexOf("hDM") returns -1 if "hDM" is not in string
      color.domain(d3.keys(dates[0].duration).filter(function(key) {  return key.indexOf("hDM") === -1; }));

      //calculate y positions for data
      dates.forEach(function(d) {
        var y0 = 0;
        d.duration.pillars = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d.duration[name+ "hDM"], duration: d.duration[name]}; });
        d.total = d.duration.pillars[d.duration.pillars.length - 1].y1;
      });

      //Boilerplate chart append
      var chart = d3.select(".chart")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Append x axis
      chart.append("g")
            .attr("class", "x axis")   // give it a class so it can be used to select only xaxis labels  below
            .attr("transform", "translate(0,-1)")
            .call(xAxis);

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

      chart.call(tip);

      var dateBar = chart.selectAll(".dateBar")
        .data(dates)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + xScale(d.date) + ",0)"; });

      dateBar.selectAll("rect")
          .data(function(d) { return d.duration.pillars; })
        .enter().append("rect")
          .attr("width", barWidth-1)
          .attr("y", function(d) { return yScale(d.y0); })
          .attr("height", function(d) {
            return yScale(d.y1) - yScale(d.y0); })
          .style("fill", function(d) { return color(d.name); })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

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

    },
    error: function(XHR, textStatus, errorThrown){
      console.log("error");
      console.log(XHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}


//initialize chart
buildChart(startChart);
$('#datePicker').val(today.toDateInputValue());
$("#chart-title").text(setTitle(today.toDateInputValue()));

//Display chart starting last week
$("#back7").on("click",function(){
  today.setDate(today.getDate() - 7);
  var newDate = today.toJSONLocal();
  $("svg").empty();
  $("#chart-title").text(setTitle(newDate));
  buildChart(newDate);
});

//Display chart starting yesterday
$("#back1").on("click",function(){
  today.setDate(today.getDate() - 1);
  var newDate = today.toJSONLocal();
  $("svg").empty();
  $("#chart-title").text(setTitle(newDate));
  buildChart(newDate);
});

//Display chart starting tomorrow
$("#forward1").on("click",function(){
  today.setDate(today.getDate() + 1);
  var newDate = today.toJSONLocal();
  $("svg").empty();
  $("#chart-title").text(setTitle(newDate));
  buildChart(newDate);
});

//Display chart starting next week
$("#forward7").on("click",function(){
  today.setDate(today.getDate() + 1);
  var newDate = today.toJSONLocal();
  $("svg").empty();
  $("#chart-title").text(setTitle(newDate));
  buildChart(newDate);
});
