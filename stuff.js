var gradesP = d3.json("classData.json")

var width = 800;
var height = 600;

var svg = d3.select("svg")
            .attr("width",width)
            .attr("height",height);

gradesP.then(function(data){
  //console.log(data);
  drawHistogram(data,0);
});

var buttonUpdate = function(d,daynumber){
  console.log(d);

  d3.select(".n").on("click",function(e){
    updateHistogram(d,daynumber+1);
  })
  d3.select(".p").on("click",function(e){
    updateHistogram(d,daynumber-1);
  })
}

var drawHistogram = function(d,daynumber){

  console.log(daynumber);

  var padding = 30;

  var xScale = d3.scaleLinear()
                .domain([0,10])
                .range([padding,width-padding]);

  /* var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([,0]); */

  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(5));

  var bins = binMaker(d.map(function(element){
    return(element.quizes[daynumber].grade)
  }));

  console.log(bins)

  // console.log(d[0].quizes[0].grade)

  var barWidth = (width-(padding*2)) / bins.length;

  var xAxis = d3.axisBottom()
      //.attr("transform","translate(0," + (height - 20) + ")")
      .scale(xScale)
      .ticks(10)

  svg.append("g")
     .attr("class","axis")
     .attr("transform","translate(0," + (height - 20) + ")")
     .call(xAxis)


  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x", function(d,i){
       console.log("hello")
       return (i * barWidth) + padding;
     })
     .attr("y", function(d){
       return height - (d.length * 50) - padding;
     })
     .attr("width", barWidth)
     .attr("height", function(d){
       return d.length * 50;
     })
     .attr("fill","purple");

  buttonUpdate(d,daynumber);
}

var updateHistogram = function(d,daynumber){

  var padding = 30;

  var xScale = d3.scaleLinear()
                .domain([0,10])
                .range([padding,width-padding]);

  var binMaker = d3.histogram()
                  .domain([0,10])
                  .thresholds(xScale.ticks(5));

  var bins = binMaker(d.map(function(element){
    return(element.quizes[daynumber].grade)
  }));

  svg.selectAll("rect")
     .data(bins)
     .attr("y", function(d){
       return height - (d.length * 50) - padding;
     })
     .attr("height", function(d){
       return d.length * 50;
     });

  console.log(daynumber)

  document.getElementById("dayParagraph").innerHTML = d[0].quizes[daynumber].day;

  buttonUpdate(d,daynumber);
}
