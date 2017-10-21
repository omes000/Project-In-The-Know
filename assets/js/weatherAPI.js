/* Apixu API Weather js
Documentation:  https://www.apixu.com/doc/ */

// Create function to get weather
function getWeather(userLocation){
	// Declaring apiKey and queryURL
	var apiKey = "dcdb5e1e6d6e436d95224746171310"; 
	var queryURL = "https://api.apixu.com/v1/forecast.json?key="+apiKey+"&q="+userLocation.lat+","+userLocation.long+"&days=5";

	// Create an AJAX call to retrieve data in console https://www.apixu.com/doc/forecast.aspx
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){
		weather = response;
		// Get array of forecast: temp(f),text,icon localtime.  Then output for each day for max/min temp, condition, icon and format of date.
		var forecast = [];
		for (var i = 0; i<5; i++){
			var tempForecast = {};

			/*The current temperature could have been stored separately, since the data is different. However, the desire was to only pass a single object, hence why this method of storing the data was chosen.*/
			if (i === 0){
				tempForecast = {
					currentTemp: weather.current.temp_f,
					currentHumidity: weather.current.humidity,
					currentWindSpeed: weather.current.wind_mph.toFixed(0),
					currentWindDirection: weather.current.wind_dir,
					currentCondition: weather.current.condition.text,
					currentConditionIcon: weather.current.condition.icon,
					currentConditionCode: weather.current.condition.code,
					currentConditionNewIcon: "",
					currentTime: moment(weather.location.localtime).format("hh:mm"),
					currentAMPM: moment(weather.location.localtime).format("A"),
					currentDate: moment(weather.location.localtime).format("ddd MMM. DD")
				};
				forecast.push(tempForecast); 
			}
			else{
				tempForecast = {
					maxTemp:weather.forecast.forecastday[i].day.maxtemp_f,
					minTemp: weather.forecast.forecastday[i].day.mintemp_f,
					condition: weather.forecast.forecastday[i].day.condition.text,
					conditionIcon: weather.forecast.forecastday[i].day.condition.icon,
					conditionCode: weather.forecast.forecastday[i].day.condition.code,
					conditionNewIcon: "",
					date: getDayfromNum(new Date(weather.forecast.forecastday[i].date.replace(/-/, '/').replace(/-/,'/')).getDay())
				};
				forecast.push(tempForecast);
			}
		}

		// Builds the Weather Widget
		buildWeatherWidget(userLocation, forecast);
	});
}

