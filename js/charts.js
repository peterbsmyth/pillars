var makeUTCDate = function(dateString){
  var d = new Date(dateString);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),  d.getUTCHours(), d.getUTCMinutes());
}

var addMinutes = function(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

var durationToMinutes = function(duration){
  var hours = parseInt(duration.substr(0,2),10) * 60;
  var minutes = parseInt(duration.substr(3,2),10);
  return hours + minutes;
}

$.ajax({
  type: "GET",
  url: "functions.php",
  data: {content: "pillarsLog"},
  dataType: "json",
  success: function(response){
    console.log(response);
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
      if (item.event_date.substr(0,10) === curDate){
        count++;
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

    console.log(dates);

    /////////////////////
    // BEGIN D3 /////////
    /////////////////////

    //Conventional D3 Margin
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
                width = 970 - margin.left - margin.right,
                height = 530 - margin.top - margin.bottom;

    //Boilerplate chart append
    var chart = d3.select(".chart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Set minimum and maximum date for input domain
    var minDate = new Date("2015-02-16");
    var maxDate = new Date("2015-02-22");

    var xScale = d3.time.scale()
                  .domain([minDate,d3.time.day.offset(maxDate,1)])
                  .range([0,width]);

    var xAxis = d3.svg.axis()
                  .orient("top")
                  .ticks(7)
                  .scale(xScale);

    var yScale = d3.scale.linear()
                  .domain([0,24])
                  .range([0,height]);

    var yAxis = d3.svg.axis()
                  .orient("left")
                  .ticks(24)
                  .scale(yScale);

    chart.append("g")
          .attr("class", "x axis")   // give it a class so it can be used to select only xaxis labels  below
          .attr("transform", "translate(0,0)")
          .call(xAxis);

    chart.append("g")
          .attr("class", "y axis")   // give it a class so it can be used to select only xaxis labels  below
          .attr("transform", "translate(0,0)")
          .call(yAxis);

  },
  error: function(XHR, textStatus, errorThrown){
    console.log("error");
    console.log(XHR);
    console.log(textStatus);
    console.log(errorThrown);
  }
});
