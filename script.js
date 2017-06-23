var container = d3.select("#emojis");
var monthContainer;
var monthTitle;
var parseTime = d3.timeParse("%A, %B %e, %Y");
var formatTime = d3.timeFormat("%B");

var currentMonth = "";
d3.csv("messages.csv", function(data) {
  data.forEach(function(message) {
    var author = (message.author).substring(0, 1);
    var date = parseTime(message.date);
    var month = formatTime(date);
    if (month != currentMonth) {
      monthContainer  = container.append("div").attr("class", "month");
      monthTitle      = monthContainer.append("div").attr("class", "month-title");
      monthTitle.append("div").attr("class", "month-year").text(d3.timeFormat("%Y")(date));
      monthTitle.append("div").attr("class", "month-name").text(month);
      currentMonth = month;
    }
    emojis = message.emojis.split(',')
    for (var i = 0; i < emojis.length; i++) {
      var emoji = emojione.shortnameToImage(emojis[i]);
      monthContainer.append("div")
        .attr("class", "emoji "+author)
        .html(emoji);
    }
  });
});
