/* search.js using Bing API News 
Documentation:  https://docs.microsoft.com/en-us/azure/cognitive-services/bing-news-search/search-the-web */

function displayNews(userLocation) {

	$.ajax({
		url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search",
		data: {
			"q": userLocation.search,
			"mkt": "en-US",
			"count": "3",
			"freshness": "Day"
		},
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "2a91e1b45c85447893865add83612801");
		},
		type: "GET",
	}).done(function(response) {
		var news = response.value

		/*Occasionally, the API response is empty, especially if the location entered isn't heavily featured in the news. The following code calls another function that sends another request to the Bing News API but with a different query term.*/
		if(news.length < 1){
			var newNews = displayMoreNews(userLocation);
			newNews.done(function(response){
				console.log(response);
				news = response.value;
				buildingNewsContainer(userLocation, news);
				populateNewsInfo(userLocation, news);
			});
		}
		else{
			buildingNewsContainer(userLocation, news);
			populateNewsInfo(userLocation, news);
		}
	})
}

/*Essentially the same AJAX call to the API as the other function, but with a different query term. This function is only called if the response from the API is empty.*/
function displayMoreNews(userLocation) {

	return $.ajax({
		url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search",
		data: {
			"q": userLocation.state,
			"mkt": "en-US",
			"count": "3",
			"freshness": "Day"
		},
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "2a91e1b45c85447893865add83612801");
		},
		type: "GET",
	});
}

//The buildNewsContainer builds the News card skeleton for each city.  
function buildingNewsContainer(userLocation, news) {
	var newsCard = $("<div>");
	newsCard.addClass("card news-card").attr("id", userLocation.cityID + "-news-card");
	newsCard.append("<div class = 'row subtitle-card-main'>" + userLocation.city + " Stories</div>");

	for (i = 0; i < news.length; i++){
		var eachNews = $("<div>");
		eachNews.addClass("media").attr("id", userLocation.cityID + "-media-" + i);

		var eachNewsImageArea = $("<div>");
		eachNewsImageArea.addClass("media-left").attr("id" ,userLocation.cityID + "-media-image-container-" + i);

		var eachNewsImage = $("<img>");
		eachNewsImage.addClass('media-object').attr('id', userLocation.cityID + '-media-image-' + i);
		eachNewsImageArea.append(eachNewsImage);

		var eachNewsBody = $("<div>");
		eachNewsBody.addClass("media-body").attr("id",userLocation.cityID + "-media-body-" + i);

		var eachNewsHeading = $("<a>");
		eachNewsHeading.addClass("media-heading").attr("id",userLocation.cityID + "-media-heading-" + i);
		eachNewsBody.append(eachNewsHeading)

		var eachNewsSubHeading = $("<div>");
		eachNewsSubHeading.addClass("media-subheading").attr("id",userLocation.cityID + "-media-subheading-" + i);
		eachNewsBody.append(eachNewsSubHeading);

		var eachNewsDescription = $("<div>");
		eachNewsDescription.addClass("media-description").attr("id",userLocation.cityID + "-media-description-" + i);
		eachNewsBody.append(eachNewsDescription);

		eachNews.append(eachNewsImageArea, eachNewsBody);

		//This if statement inserts a div that creates a border between the news elements.
		if (i < 2){
			var newsBorder = $("<div>");
			newsBorder.addClass("news-border");
			eachNews.append(newsBorder);
		}
		newsCard.append(eachNews);
	}

	$("#"+ userLocation.cityID + '-news-container').append(newsCard);
}

//The populateNewsInfo function fills in the News card skeleton with data from the API response.
function populateNewsInfo (userLocation, news) {
	for (var i = 0; i < news.length; i++){
		$("#"+userLocation.cityID + '-media-heading-' + i).append(news[i].name.toUpperCase()).attr("href",news[i].url).attr("target","_blank");
		$("#"+userLocation.cityID + '-media-description-' + i).append(news[i].description);
		$("#"+userLocation.cityID + '-media-subheading-' + i).append(news[i].provider[0].name).append(" - " + moment.parseZone(news[i].datePublished).local().fromNow());

		/*Occasionally, the News response for an article will not have an image. This causes an error that prevents the remainder of the news elements to populate. The following code determines if there is an image, and if there is not, then it uses a placeholder image in its place.*/
		if(typeof news[i].image !== "undefined"){
			$("#"+userLocation.cityID + '-media-image-' + i).attr("src", news[i].image.thumbnail.contentUrl);
		}
		else{
			$("#"+userLocation.cityID + '-media-image-' + i).attr("src", "http://placehold.it/100x100");
		}
	}
}


