var gradesP = d3.json("classData.json")

gradesP.then(function(data){
  console.log(data);
});

var drawHistogram = function(d){

  var xScale = d3.scaleLinear()
                .domain(d3.extent(d))
                .range([0,10]);

  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(5));

  var bins = binMaker(d);

}
