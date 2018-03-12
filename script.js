var container = d3.select("#emojis");
var monthContainer;
var monthTitle;
var emojiwrapper;
var parseDate = d3.timeParse("%A, %B %e, %Y");
var parseTime = d3.timeParse("%I:%M:%S %p");
var formatDate = d3.timeFormat("%B");
var formatTime = d3.timeFormat("%H:%M:%S");

var currentMonth = "";
d3.csv("messages.csv", function(data) {
  data.forEach(function(message) {
    var author = (message.author).substring(0, 1);
    var date = parseDate(message.date);
    var month = formatDate(date);
    var time = parseTime(message.time);
    if (month != currentMonth) {
      monthContainer  = container.append("div").attr("class", "month");
      monthTitle      = monthContainer.append("div").attr("class", "month-title");
      emojiwrapper    = monthContainer.append("div").attr("class", "emoji-wrapper");
      monthTitle.append("div").attr("class", "month-year").text(d3.timeFormat("%Y")(date));
      monthTitle.append("div").attr("class", "month-name").text(month);
      currentMonth = month;
    }
    emojis = message.emojis.split(',')
    for (var i = 0; i < emojis.length; i++) {
      var emoji = emojione.shortnameToImage(emojis[i]);
      emojiwrapper.append("div")
        .attr("class", "emoji "+author)
        .attr("aria-label", formatTime(time))
        .html(emoji);
    }
  });
});
