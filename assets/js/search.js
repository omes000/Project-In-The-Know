 var userLocations;
 var lat, long;

 function initialize() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        { types: ["(cities)"] });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
	        userLocations = autocomplete.getPlace();
	        console.log(userLocations);

			userCity = userLocations.address_components[0].long_name;
			lat = userLocations.geometry.location.lat();
			long = userLocations.geometry.location.lng();

			getWeather(userCity, lat, long);
        });
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

