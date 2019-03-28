var gradesP = d3.json("classData.json")

gradesP.then(function(data){
  //console.log(data);
  drawHistogram(data,0);
});

var buttonUpdate = function(d,daynumber){
  d3.select(".p").on("click",function(d){
    
  })
}

var drawHistogram = function(d,daynumber){

  var xScale = d3.scaleLinear()
                .domain([0,10])
                .range([0,10]);

  /* var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([,0]); */

  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(5));

  // var bins = binMaker(d.quizes[daynumber].grade);

  // console.log(d[0].quizes[0].grade)

  d.map(function(element){
    console.log(element.quizes[0].grade)
    return(element.quizes[0].grade)
  })

  var width = 800;
  var height = 600;

  var svg = d3.select("svg")
              .attr("width",width)
              .attr("height",height);

  var barWidth = 30;

  svg.selectAll("rect")
     .data(d)
     .enter()
     .append("rect")
     .attr("x", function(d,i){
       return i * barWidth;
     })
     .attr("y", d.map(function(element){
       return height - (element.quizes[0].grade * (height/10));
     }))
     .attr("width",barWidth)
     .attr("height",d.map(function(element){
       return element.quizes[0].grade * (height/10);
     }))
     .attr("fill",blue);


}
