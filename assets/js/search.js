 var userLocations;
 var lat, long;

function initialize() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        { types: ["(cities)"] });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
	        userLocations = autocomplete.getPlace();
	        console.log(userLocations);
	        var test = formatUserLocationObject(userLocations);
	        console.log(test);

			userCity = userLocations.address_components[0].long_name;
			lat = userLocations.geometry.location.lat();
			long = userLocations.geometry.location.lng();

			getWeather(userCity, lat, long);
        });
}

function formatUserLocationObject(userLocation){
	var userLocationObject = {};

	var lengthAddressComponents = userLocation.address_components.length;
	var cityName = userLocations.address_components[0].long_name;

	var countryNameHolder = userLocations.address_components[lengthAddressComponents - 1].long_name;
	var countryName;

	var stateNameHolder = userLocations.address_components[lengthAddressComponents - 2].long_name;
	var stateName;

	var lat = userLocation.geometry.location.lat();
	var long = userLocation.geometry.location.lng();

	//check if the last element in the address component is a number; if it is not then we keep it the same. if it is, then we set country name equal to the element before the last. The use case is currently seen for Australia, Kazakhstan, 
	if (isNaN(parseInt(countryNameHolder))){
		countryName = countryNameHolder;
		stateName = stateNameHolder;

	} else{
		countryName = userLocations.address_components[lengthAddressComponents - 2].long_name;
		stateName = userLocations.address_components[lengthAddressComponents - 3].long_name
	}

	userLocationObject = {
		city: cityName,
		state: stateName,
		country: countryName,
		lat: lat.toFixed(2),
		long: long.toFixed(2)
	}

	return userLocationObject;
	
}


function buildCityCards(){


}


// FIREBASE CODE COMMENTED OUT

// function intialize(callback){

//     autocomplete = new google.maps.places.Autocomplete(
// 	    (document.getElementById('autocomplete')),
// 	    { types: ["(cities)"] });
// 	    google.maps.event.addListener(autocomplete, 'place_changed', function(callback) {
// 		    temp=autocomplete.getPlace();
// 	    	var newPlace = {
// 	    		locality: temp.locality,
// 	    		region: temp.region,
// 	    		country: temp.country-name,
// 	    		lat: temp.lat,
// 	    		long: temp.lng, 

// 	    	};
// 	    	callback(newPlace);
// 		    console.log(temp);
// 		    console.log(callback);

//     });

// }

