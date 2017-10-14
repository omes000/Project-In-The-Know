 var temp;

 function initialize() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        { types: ["(cities)"] });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
        temp=autocomplete.getPlace();
        console.log(temp)
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

