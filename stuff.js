var gradesP = d3.json("classData.json")

gradesP.then(function(data){
  //console.log(data);
  drawHistogram(data);
});

var drawHistogram = function(d){

  var xScale = d3.scaleLinear()
                .domain(d3.extent(d))
                .range([0,10]);

  /* var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([,0]); */

  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(5));

  var bins = binMaker(d);
  console.log(bins);


}
