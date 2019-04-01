var gradesP = d3.json("classData.json")

var width = 800;
var height = 600;

var padding = 20;

var svg = d3.select("svg")
            .attr("width",width)
            .attr("height",height);

gradesP.then(function(data){
  drawHistogram(data,0);
});

var buttonUpdate = function(data,daynumber,yScale,binMaker){

  d3.select(".n").on("click",function(d){
    updateHistogram(data,daynumber+1,yScale,binMaker);
  })
  d3.select(".p").on("click",function(d){
    updateHistogram(data,daynumber-1,yScale,binMaker);
  })
}

var drawHistogram = function(d,daynumber){

  var xScale = d3.scaleLinear()
                .domain([0,11])
                .range([padding,width-padding]);

  var yScale = d3.scaleLinear()
                         .domain([0,10])
                         .range([height-padding,padding]);

  var binMaker = d3.histogram()
                  .domain(xScale.domain())
                  .thresholds(xScale.ticks(11));

  var bins = binMaker(d.map(function(element){
    return(element.quizes[daynumber].grade)
  }));

  var colors = d3.scaleLinear()
                 .domain([0,11])
                 .range(["#DEF4C6","#1B512D"])

  // var barWidth = (width-(padding*2)) / bins.length;

  var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(10);

  svg.append("g")
     .attr("class","axis")
     .attr("transform","translate(0," + (height - padding) + ")")
     .call(xAxis);

  var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(10);

  svg.append("g")
     .attr("class","axis")
     .attr("transform","translate("+(padding)+",0)")
     .call(yAxis);


  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x", function(d,i){
       return xScale(i);
     })
     .attr("y", function(d){
       return yScale(d.length);
     })
     .attr("width", function(d,i){
       return xScale(i) - xScale(i-1);
     })
     .attr("height", function(d){
       return height - yScale(d.length) - padding;
     })
     .attr("fill",function(d,i){
       return colors(i);
     })
     .attr("stroke-width",3)
     .attr("stroke","black");

  buttonUpdate(d,daynumber,yScale,binMaker);
}

var updateHistogram = function(d,daynumber,yScale,binMaker){

  var bins = binMaker(d.map(function(element){
    return(element.quizes[daynumber].grade)
  }));

  svg.selectAll("rect")
     .data(bins)
     .attr("y", function(d){
       return yScale(d.length);
     })
     .attr("height", function(d){
       return height - yScale(d.length) - padding;
     });

  document.getElementById("dayParagraph").innerHTML = "Day " + d[0].quizes[daynumber].day;

  buttonUpdate(d,daynumber,yScale,binMaker);
}
