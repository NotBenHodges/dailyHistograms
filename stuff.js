var gradesP = d3.json("classData.json")

gradesP.then(function(data){
  //console.log(data);
  drawHistogram(data,0);
});

var drawHistogram = function(d,daynumber){

  var xScale = d3.scaleLinear()
                .domain([0,10])
                .range([0,10]);

  /* var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([,0]); */

  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(4));

  var bins = binMaker(d.map(function(element){
    return(element.quizes[19].grade);
  }));

  console.log(bins)

  // console.log(d[0].quizes[0].grade)

  // d.map(function(element){
  //   console.log(element.quizes[0].grade)
  //   return(element.quizes[0].grade)
  // })

  var width = 800;
  var height = 600;

  var svg = d3.select("svg")
              .attr("width",width)
              .attr("height",height);

  var barWidth = width / 6;

  // svg.selectAll("rect")
  //    .data(d)
  //    .enter()
  //    .append("rect")
  //    .attr("x", function(d,i){
  //      return i * barWidth;
  //    })
  //    .attr("y", function(d){
  //      return height - (d.quizes[0].grade * (height/10));
  //    })
  //    .attr("height", (function(d){
  //      return d.quizes[0].grade * (height/10);
  //    }))
  //    .attr("width", barWidth)
  //    .attr("fill","blue");

  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x",function(d,i){
       return i * barWidth;
     })
     .attr("y", function(d){
       return height - (d.length * (height/15));
     })
     .attr("width",barWidth)
     .attr("height",function(d){
       return d.length * (height/15);
     })
     .attr("fill","green");

}
