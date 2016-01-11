// d3.select("h1").style("font-weight", "200");

// d3.selectAll("p").style("color", function() {
//   return "hsl(" + Math.random() * 360 + ",100%,50%)";
// });

// d3.selectAll("p").style("color", function(d, i) {
//   return i % 2 ? "#fff" : "#eee";
// });

// var sizes = [2.5, 1.8, 1.3, 34, 55, 'taco'];
//
// // d3.selectAll("p")
// //     .data(sizes)
// //     .style("font-size", function(d) { return d + "em"; });
//
// // Update…
// var p = d3.select(".para").selectAll("p")
//     .data(sizes)
//     .text(function(d) { return d; });
//
// // Enter… aka add
// p.enter().append("p")
//     .text(function(d) { return d; });
//
// // Exit… aka remove
// p.exit().remove();

d3.select("body").transition()
    .duration(2000)
    .style("background-color", "#c1c1c1");

// d3.json('test.json', function(error, data) {
//     console.log(error);
//     console.log(data);
//
// });

var height = 500,
     width = 800;

var padding = 50;

var viz = d3.select("#viz-wrapper")
                .append('svg')
                .attr('height', height + (padding * 2))
                .attr('width', width + (padding * 2))
                .append('g')
                .attr('id', 'viz')
                .attr('transform',
                    'translate(' + padding + ',' + padding + ')');

var yScale = d3.scale.linear()
                        .range([height, 0 ]);

var xScale = d3.time.scale()
                        .range([0, width]);

var xAxis = d3.svg.axis().scale(xScale)
                        .orient("bottom")
                        .ticks(20);

var yAxis = d3.svg.axis().scale(yScale)
                        .orient("left")
                        .ticks(8);

var parseTime = d3.time.format("%Y%m%d");

d3.csv('climate_data.csv', function(data) {
    yDomain = d3.extent(data, function(element) {
        return parseInt(element.TMAX) * 1.1;
    });

    xMin = d3.min(data, function(element) {
       time = parseTime.parse(element.DATE);
       time.setMonth(time.getMonth() - 1);
       return time;
    });

    xMax = d3.max(data, function(element) {
       time = parseTime.parse(element.DATE);
       time.setMonth(time.getMonth() + 1);
       return time;
    });

    xDomain = d3.extent(data, function(element) {
       return parseTime.parse(element.DATE);
    });

    yScale.domain(yDomain);
    xScale.domain([xMin, xMax]);

    viz.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform", function() {
               return "rotate(-65)";
               })
        .style("text-anchor", "end")
        .style('font-size', '10px')
        .attr("dx", "-10px")
        .attr("dy", "10px");

    viz.append("g")
         .attr("class", "y axis")
         .call(yAxis);

    dots = viz.selectAll('g.dots')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'dots');

    dots.attr('transform', function(d) {
            // get the x position
            date = parseTime.parse(d.DATE);
            x = xScale(date);
            // get the y position
            y = yScale(d.TMAX);
            return 'translate(' + x + ',' + y + ')';
        });
        //.style('stroke-width', '1px')
        // .style('fill', function(d) {
        //     year = d.DATE.charAt(3);
        //     return year === '3' ? '#b3b3b3' : '#d9d9d9';
        // })
        // .style('stroke', function(d) {
        //     year = d.DATE.charAt(3);
        //     return year === '3' ? '#d9d9d9' : '#a3a3a3';
        // });

    dots.append('circle')
        .attr('r', 5)
        .style('fill','#d9d9d9');
        //.attr('r', function(d, i) {
        //    return Math.abs(d.TMAX) / 12; });
        // .attr('cx', function(d) {
        //     date = parseTime.parse(d.DATE);
        //     return xScale(date); })
        // .attr('cy', function(d) {
        //     return yScale(d.TMAX); });

    dots.append('text')
        .style('fill','#000')
        .text(function(d) {
            return d.TMAX;
    });

    // dots.attr('r', function(d, i) {
    //     return Math.abs(d.TMAX) / 10; })
    //     .attr('cx', function(d) {return Math.max(0 + padding, Math.random() * width - padding ); })
    //     .attr('cy', function(d) {return Math.max(0 + padding, Math.random() * height - padding ); })
    //     .style('stroke', '#f1f1f1')
    //     .style('stroke-width', '2px')
    //     .style('fill', function(d) {
    //         year = d.DATE.charAt(3);
    //         if (year === '3') {
    //             return "#b3b3b3";
    //         }
    //         else {
    //             return "#d9d9d9";
    //         }
    //     });
});




    // var w = 800,
    //     h = 400;
    //
    // var circleWidth = 5;
    //
    // var fontFamily = 'sans-serif',
    //     fontSizeHighlight = '4em',
    //     fontSizeNormal = '1em';
    //
    // var palette = {
    //       "lightgray": "#819090",
    //       "gray": "#708284",
    //       "mediumgray": "#536870",
    //       "darkgray": "#475B62",
    //       "darkblue": "#0A2933",
    //       "darkerblue": "#042029",
    //       "paleryellow": "#FCF4DC",
    //       "paleyellow": "#EAE3CB",
    //       "yellow": "#A57706",
    //       "orange": "#BD3613",
    //       "red": "#D11C24",
    //       "pink": "#C61C6F",
    //       "purple": "#595AB7",
    //       "blue": "#2176C7",
    //       "green": "#259286",
    //       "yellowgreen": "#738A05"
    //   };
    //
    //
    //
    //     //CIRCLE
    //     node.append("svg:circle")
    //       .attr("cx", function(d) { return d.x; })
    //       .attr("cy", function(d) { return d.y; })
    //       .attr("r", circleWidth)
    //       .attr("fill", function(d, i) { return i > 0 ? palette.pink : palette.paleryellow; } );
