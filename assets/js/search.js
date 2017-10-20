function initialize() {
	autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),{ types: ["(cities)"] });
	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		
		var userLocation = formatUserLocationObject(autocomplete.getPlace());

		addToFirebase(userLocation);

		$("#autocomplete").val('');
	});
}

function formatUserLocationObject(userLocation){
	var userLocationObject = {};

	var lengthAddressComponents = userLocation.address_components.length;
	var cityName = userLocation.address_components[0].long_name;
	var cityNameforIDs = "";
	
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
		cityNameforIDs = cityName.replace(" ", "")+ stateName.replace(" ", "");
	} else{
		countryName = userLocation.address_components[lengthAddressComponents - 2].long_name;
		stateName = userLocation.address_components[lengthAddressComponents - 3].long_name;
		cityNameforIDs = cityName.replace(" ", "")+ stateName.replace(" ", "");
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

	var cityCardContainer = $("<div>");
	cityCardContainer.addClass('row card-container big-card').attr('id', userLocation.cityID + "-card-container");

	var infoContainer = $("<div>");
	infoContainer.addClass('card info col-lg-12').attr('id', userLocation.cityID + '-name-display').html("<div class = 'row'><div class = 'col-lg-12 title'>"+ userLocation.city.toUpperCase() + "</div><div class = 'col-lg-12 subtitle-name'>" + userLocation.country.toUpperCase()+"</div></div>");

	var aboutCityContainer = $("<div>");
	aboutCityContainer.addClass('col-lg-12 card about-city').attr('id', userLocation.cityID + '-about-city-container');

	var aboutContainerRow = $("<div>").addClass('row zero-margin');

	var newsContainer = $("<div>").addClass('news-container col-lg-8').attr('id', userLocation.cityID + '-news-container');
	var timeWeatherContainer = $("<div>").addClass('time-weather-container col-lg-4').attr('id', userLocation.cityID + '-time-weather-container');

	var timeWidgetContainer = $("<div>").addClass('card-container time-widget-container').attr('id', userLocation.cityID+'-time-container');
	var weatherWidgetContainer = $("<div>").addClass('card-container weather-widget-container').attr('id', userLocation.cityID+'-weather-container');

	timeWeatherContainer.append(timeWidgetContainer, weatherWidgetContainer);
	aboutContainerRow.append(newsContainer, timeWeatherContainer);
	aboutCityContainer.append(aboutContainerRow);
	cityCardContainer.append(infoContainer, aboutCityContainer);

	$('.container').append(cityCardContainer);
}

$('.remove-cards').on('click', '.remove', clearAllCards);
