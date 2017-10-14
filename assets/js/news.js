	
$(document).on("click", ".btn", displayNews);
function displayNews() {

 $.ajax({
    url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search",
    data: {
      "q": $("#autocomplete").val(),
      "mkt": "en-US",
      "count": "2",
      "offset": "0"
    },
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "3e8463042fb349f4a2e84e8cec9e65f1");
    },
    type: "GET",
  }).done(function(response) {
      console.log(response)
      var NEWS = response.value
      console.log(NEWS)
      /*console.log(NEWS[1].name)
      console.log(NEWS[1].description)
      console.log("date published: " + NEWS[1].datePublished)
      console.log("news agency: " + NEWS [1].provider[0].name)
      console.log("imageURL: " + NEWS[1].image.thumbnail.contentUrl)
      console.log("newsSourceURL: " + NEWS[1].url)*/
      console.log(NEWS.length);


         //  for (var i=0; i<NEWS.length; i++){
         //  var newsName = $(".media-heading").append(NEWS[i].name.toUpperCase());
         //  var newsDescription = $(".media-description" ).append(NEWS[i].description);
         // //  var newsURLs = NEWS[i].url;
         //  var newsThumbnail = $(".media-object").attr("src",NEWS[i].image.thumbnail.contentUrl);
         //  //$(".media").append(newsName)
         //  //$(".media").append(newsDescription)
         //  //displayeachNews.append($(".eachCity"))
    
      buildingNewsContainer("chicago", NEWS.length);
      populateNewsInfo("chicago", NEWS);
         
    })
}


  function buildingNewsContainer(cityname, newslength) {
    for (i=0; i<newslength; i++){
      var eachNews = $("<div>");
      eachNews.addClass("media")
      eachNews.attr("id",cityname + "-media-" + i)
    
      var eachNewsImage = $("<div>");
      eachNewsImage.addClass("media-left")
      eachNewsImage.attr("id",cityname + "-media-image-container-" + i)
      eachNews.append(eachNewsImage)


      var eachNewsBody = $("<div>");
      eachNewsBody.addClass("media-body")
      eachNewsBody.attr("id",cityname + "-media-body-" + i)
      eachNews.append(eachNewsBody)

      console.log(cityname);
      $("#" + cityname + '-media').append(eachNews)

    }
  }

  function populateNewsInfo (cityname, news) {
       for (var i=0; i<news.length; i++){
          var newsName = $("#"+cityname + '-media-body-' + i).append(news[i].name.toUpperCase());
          var newsDescription = $("#"+cityname + '-media-body-' + i).append(news[i].description);
         //  var newsURLs = NEWS[i].url;
         var imgLeft = $("<img>");
         imgLeft.addClass('media-object').attr('id', cityname + '-media-image-' + i).attr("src", news[i].image.thumbnail.contentUrl);

         $("#"+cityname + "-media-image-container-" + i).append(imgLeft);

        }
    }

