// Weather Widget: Apixu.com JSON Weather API

// Declare variables for Apixu apiKey and queryURL
	var apiKey = "dcdb5e1e6d6e436d95224746171310"; 
	var queryURL = "http://api.apixu.com/v1/forecast.json?key="+apiKey+"&q="+Number(lat).toFixed(2)+","+Number(long).toFixed(2)+"&days=5";

// Create an AJAX call to retrieve the data and log into the console
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		weather = response;
		var temp = weather.current.condition;
		console.log(temp);