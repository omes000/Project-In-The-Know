function initialize() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        { types: ["(cities)"] });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
        	
        	var userLocation = formatUserLocationObject(autocomplete.getPlace());

    			$( "#search123" ).on("click", function() {
			        //alert('test');
			        //userLocation ;
			        //$(document).on("click", ".btn", console.log(userLocation));
			        //console.log("label",userLocation);
			        addToFirebase(userLocation);
			  //       buildCityCards(userLocation);
					// getWeather(userLocation);
					// displayNews(userLocation);
			        

    			});

	

			//addToFirebase(userLocation);
	        // var userLocation = formatUserLocationObject(autocomplete.getPlace());


	        // //$(document).on("click", ".btn", console.log(userLocation));
	        // console.log("label",userLocation);
	        // addToFirebase(userLocation);

			//getWeather(userLocation);
			//buildCityCards(userLocation);
			//getWeather(userLocation);
			//displayNews(userLocation);

        });
}

function formatUserLocationObject(userLocation){
	var userLocationObject = {};

	var lengthAddressComponents = userLocation.address_components.length;
	var cityName = userLocation.address_components[0].long_name;
	var cityNameforIDs = cityName.replace(" ", "");

	var countryNameHolder = userLocation.address_components[lengthAddressComponents - 1].long_name;
	var countryName;

	var stateNameHolder = userLocation.address_components[lengthAddressComponents - 2].long_name;
	var stateName;

	var lat = userLocation.geometry.location.lat();
	var long = userLocation.geometry.location.lng();

	var fullAddress = userLocation.formatted_address;

	//check if the last element in the address component is a number; if it is not then we keep it the same. if it is, then we set country name equal to the element before the last. The use case is currently seen for Australia, Kazakhstan, 
	if (isNaN(parseInt(countryNameHolder))){
		countryName = countryNameHolder;
		stateName = stateNameHolder;

	} else{
		countryName = userLocation.address_components[lengthAddressComponents - 2].long_name;
		stateName = userLocation.address_components[lengthAddressComponents - 3].long_name
	}

	userLocationObject = {
		city: cityName,
		cityID: cityNameforIDs,
		state: stateName,
		country: countryName,
		lat: lat.toFixed(2),
		long: long.toFixed(2),
		full: fullAddress
	}


	return userLocationObject;
	
}


function buildCityCards(userLocation){
	var cityCard = $("<div>");
	cityCard.addClass('row gap-top gap-bottom big-card').attr('id', userLocation.cityID);

	var infoContainer = $("<div>");
	infoContainer.addClass('info col-lg-12 padding-top');

	var cityNameDisplay = $("<div>");
	cityNameDisplay.addClass('col-lg-6 city').html("<h2 class = 'title'>"+userLocation.city + ", " + userLocation.country+"</h2>");

	var weatherDisplay = $("<div>");
	weatherDisplay.addClass("col-lg-6 weather").attr('id', userLocation.cityID+'-weather-area');

	infoContainer.append(cityNameDisplay, weatherDisplay);

	var newsContainer = $("<div>");
	newsContainer.addClass('news col-lg-12').attr('id', userLocation.cityID + '-media');

	cityCard.append(infoContainer, newsContainer);

	$('.container').append(cityCard);

}

