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
