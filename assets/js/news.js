/* search.js using Bing API News 
Documentation:  https://docs.microsoft.com/en-us/azure/cognitive-services/bing-news-search/search-the-web */

function displayNews(userLocation) {

	//need to add logic for dealing with US based cities and world cities.

	$.ajax({
		url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search",
		data: {
			"q": userLocation.cityID,
			"mkt": "en-US",
			"count": "3",
			"offset": "0"
		},
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "3a50fa406cbb40128ac6c801d830fc6a");
		},
			type: "GET",
	}).done(function(response) {
		console.log(response)
		var news = response.value
		console.log(news)
	  /*console.log(news[1].name)
	  console.log(news[1].description)
	  console.log("date published: " + news[1].datePublished)
	  console.log("news agency: " + news [1].provider[0].name)
	  console.log("imageURL: " + news[1].image.thumbnail.contentUrl)
	  console.log("newsSourceURL: " + news[1].url)*/
	  console.log(news.length);

	  buildingNewsContainer(userLocation, news);
	  populateNewsInfo(userLocation, news);

	})
}


function buildingNewsContainer(userLocation, news) {
	for (i=0; i<news.length; i++){
		var eachNews = $("<div>")
		eachNews.addClass("media")
		eachNews.attr("id",userLocation.cityID + "-media-" + i)

		var eachNewsImageArea = $("<div>");
		eachNewsImageArea.addClass("media-left")
		eachNewsImageArea.attr("id",userLocation.cityID + "-media-image-container-" + i)
		eachNews.append(eachNewsImageArea)

		var eachNewsImage = $("<img>");
		eachNewsImage.addClass('media-object')
		eachNewsImage.attr('id', userLocation.cityID + '-media-image-' + i)
		eachNewsImageArea.append(eachNewsImage)

		var eachNewsBody = $("<div>");
		eachNewsBody.addClass("media-body")
		eachNewsBody.attr("id",userLocation.cityID + "-media-body-" + i)
		eachNews.append(eachNewsBody)

		var eachNewsHeading = $("<a>");
		eachNewsHeading.addClass("media-heading")
		eachNewsHeading.attr("id",userLocation.cityID + "-media-heading-" + i)
		eachNewsBody.append(eachNewsHeading)

		var eachNewsSubHeading = $("<div>");
		eachNewsSubHeading.addClass("media-subheading")
		eachNewsSubHeading.attr("id",userLocation.cityID + "-media-subheading-" + i)
		eachNewsBody.append(eachNewsSubHeading)

		var eachNewsDescription = $("<div>");
		eachNewsDescription.addClass("media-description")
		eachNewsDescription.attr("id",userLocation.cityID + "-media-description-" + i)
		eachNewsBody.append(eachNewsDescription)


		console.log(userLocation.city);
		$("#" + userLocation.cityID + '-media').append(eachNews)

	}
}

function populateNewsInfo (userLocation, news) {
	for (var i=0; i<news.length; i++){
		var newsName = $("#"+userLocation.cityID + '-media-heading-' + i).append(news[i].name.toUpperCase()).attr("href",news[i].url).attr("target","_blank");
		var newsDescription = $("#"+userLocation.cityID + '-media-description-' + i).append(news[i].description);
		var newssubHeading = $("#"+userLocation.cityID + '-media-subheading-' + i).append(news[i].provider[0].name).append(" - " + moment.parseZone(news[i].datePublished).local().fromNow());
		 //  var newsURLs = NEWS[i].url;
		 //var newsImage = $("#"+userLocation.cityID + '-media-image-' + i).attr("src", news[i].image.thumbnail.contentUrl);
		}
	}


