/* Apixu API Weather js
Documentation:  https://www.apixu.com/doc/ */

// Create function to get weather
function getWeather(cityName, lat, long){
	// Declaring apiKey and queryURL
	var apiKey = "dcdb5e1e6d6e436d95224746171310"; 
	var queryURL = "http://api.apixu.com/v1/forecast.json?key="+apiKey+"&q="+Number(lat).toFixed(2)+","+Number(long).toFixed(2)+"&days=5";

	// Create an AJAX call to retrieve data in console https://www.apixu.com/doc/forecast.aspx
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){
		weather = response;

		// Get array of forecast: temp(f),text,icon localtime.  Then output for each day for max/min temp, condition, icon and format of date.
		forecast = [{
			currentTemp: weather.current.temp_f,
			currentCondition: weather.current.condition.text,
			currentConditionIcon: weather.current.condition.icon,
			currentTime: moment.unix(weather.location.localtime_epoch)
				.format("hh:mm a")
		},
		{
			dayOneMaxTemp:weather.forecast.forecastday[1].day.
				maxtemp_f,
			dayOneMinTemp: weather.forecast.forecastday[1].day.
				mintemp_f,
			dayOneCondition: weather.forecast.forecastday[1].day.
				condition.text,
			dayOneConditionIcon: weather.forecast.forecastday[1].day.condition.icon,
			dateOne: getDayfromNum(new Date(weather.forecast.
				forecastday[1].date.replace(/-/, '/').replace(/-/,'/')
				).getDay())
		},
		{
			dayTwoMaxTemp:weather.forecast.forecastday[2].day.
				maxtemp_f,
			dayTwoMinTemp: weather.forecast.forecastday[2].day.
				mintemp_f,
			dayTwoCondition: weather.forecast.forecastday[2].day.
				condition.text,
			dayTwoConditionIcon: weather.forecast.forecastday[2].day.condition.icon,
			dateTwo: getDayfromNum(new Date(weather.forecast.
				forecastday[1].date.replace(/-/, '/').replace(/-/,'/')
				).getDay())
		},
		{
			dayThreeMaxTemp:weather.forecast.forecastday[3].day.
				maxtemp_f,
			dayThreeMinTemp: weather.forecast.forecastday[3].day.
				mintemp_f,
			dayThreeCondition: weather.forecast.forecastday[3].day.
				condition.text,
			dayThreeConditionIcon: weather.forecast.forecastday[3].day.condition.icon,
			dateOne: getDayfromNum(new Date(weather.forecast.
				forecastday[1].date.replace(/-/, '/').replace(/-/,'/')
				).getDay())
		},
		{
			dayFourMaxTemp:weather.forecast.forecastday[4].day.
				maxtemp_f,
			dayFourMinTemp: weather.forecast.forecastday[4].day.
				mintemp_f,
			dayFourCondition: weather.forecast.forecastday[4].day.
				condition.text,
			dayFourConditionIcon: weather.forecast.forecastday[4].day.condition.icon,
			dateOne: getDayfromNum(new Date(weather.forecast.
				forecastday[1].date.replace(/-/, '/').replace(/-/,'/')
				).getDay())
		}
		];

		// Weather Widget
		buildWeatherWidget(cityName, forecast);
		});
}

