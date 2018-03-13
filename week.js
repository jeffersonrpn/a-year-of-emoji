var
  margin = { top: 50, right: 40, bottom: 50, left: 60 },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  gridSize = Math.floor(width / 24),
  viewBox = {
    width: width + margin.right + margin.left,
    height: height + margin.left + margin.right
  };
var
  svg = d3.select('#week').append('svg')
		.attr('version', '1.1')
		.attr('viewBox', '0 0 '+viewBox.width+' '+viewBox.height)
		.attr('width', '100%')
		.attr('class', 'week-chart'),
  g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
  x = d3.scalePoint().domain(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).range([0, width]),
  x2 = d3.scaleBand().domain(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).range([0, width]),
  y = d3.scaleLinear().domain([0, 23]).range([0, height]),
  parseDate  = d3.timeParse('%A, %B %e, %Y'),
  parseTime  = d3.timeParse('%I:%M:%S %p'),
  formatDate = d3.timeFormat('%a'),
  formatTime = d3.timeFormat('%H');

svg.append("g").attr('transform', 'translate(' + margin.left + ',' + (margin.top*0.5) + ')').call(d3.axisTop(x));
svg.append("g").attr('transform', 'translate(' + (margin.left*0.5) + ',' + margin.top + ')')
  .call(d3.axisLeft(y)
    .ticks(24)
    .tickFormat(function(t) { return t+'h'; })
  );

var domain = x.domain().map(function(d) {
  return {
    day: d,
    hour: 0
  }
});

d3.csv('messages.csv', function(data) {
  var emojis = [];
  data.forEach(function(message) {
    emojis.push({
      time: message.time,
      day: formatDate(parseDate(message.date)),
      hour: +formatTime(parseTime(message.time)),
      author: message.author,
      emojis: message.emojis.split(',')
    });
  });
  var simulation = d3.forceSimulation(emojis)
    .force('x', d3.forceX(function(d) { return x(d.day); }))
    .force('y', d3.forceY(function(d) { return y(d.hour); }))
    .force("collide", d3.forceCollide(1.5));
  for (var i = 0; i < 120; ++i) simulation.tick();

  g.selectAll('circle')
  	.data(emojis)
  	.enter()
  	.append('circle')
      .attr('r', 1.5)
    	.attr('cx', function(d) { return d.x; })
    	.attr('cy', function(d) { return d.y; })
      .attr('fill', 'rgb(38, 175, 126)');
});
