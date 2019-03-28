var gradesP = d3.json("classData.json")

gradesP.then(function(data){
  //console.log(data);
  drawHistogram(data,0);
});

var buttonUpdate = function(d,daynumber){
  console.log(d);

  d3.select(".n").on("click",function(e){
    drawHistogram(d,daynumber+1);
  })
  d3.select(".p").on("click",function(e){
    drawHistogram(d,daynumber-1);
  })
}

var drawHistogram = function(d,daynumber){

  console.log(daynumber);

  var xScale = d3.scaleLinear()
                .domain([0,10])
                .range([0,10]);

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

  var width = 800;
  var height = 600;

  var svg = d3.select("svg")
              .attr("width",width)
              .attr("height",height);

  var barWidth = width / bins.length;

  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x", function(d,i){
       return i * barWidth;
     })
     .attr("y", function(d){
       return height - (d.length * 50);
     })
     .attr("width", barWidth)
     .attr("height", function(d){
       return d.length * 50;
     })
     .attr("fill","purple");

  buttonUpdate(d,daynumber);
}
