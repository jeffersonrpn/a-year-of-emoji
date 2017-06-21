var container = d3.select("#emojis");

d3.csv("messages.csv", function(data) {
  data.forEach(function(message) {
    var author = (message.author).substring(0, 1);
    emojis = message.emojis.split(',')
    for (var i = 0; i < emojis.length; i++) {
      var emoji = emojione.shortnameToImage(emojis[i]);
      container.append("div")
        .attr("class", "emoji "+author)
        // .style("background-color", "#8e44ad")
        .html(emoji);
    }
  });
});
