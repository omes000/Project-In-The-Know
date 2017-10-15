/* Weather Widget
Create all container divs for the Weather Widget. The Weather Widget has 3 main containers:
	1. The overall weather Widget container that contains the next two items below:
	2. The header container that contains the current weather information
	3. The forecast container that contains the weather information for the next 4 days*/

function buildWeatherWidgetContainers(userLocation){
	var weatherWidget = $("<div>");
	var weatherWidgetHeader = $("<div>");
	var weatherWidgetForecast = $("<div>");

	weatherWidget.addClass('weather-widget pull-right');
	weatherWidget.attr('id', userLocation.cityID+'-weather');

	weatherWidgetHeader.addClass('card-header');
	weatherWidgetHeader.attr('id', userLocation.cityID +'-weather-header');

	weatherWidgetForecast.addClass('forecast');
	weatherWidgetForecast.attr('id', userLocation.cityID +'-weather-forecast');
	weatherWidget.append(weatherWidgetHeader,weatherWidgetForecast);
	console.log(weatherWidget);
	$("#"+userLocation.cityID+'-weather-area').append(weatherWidget);
}

var grid;
function init(userLocation){
	grid = new Minigrid({
		container: '#'+userLocation.cityID + '-weather-forecast',
		item: userLocation.cityID+'-weather-cards',
		gutter: 2
	});
	grid.mount();
}

function update() {
	grid.mount();
}

function buildWeatherWidgetCards(userLocation){
	for (var i = 1; i<5; i++){
		var newDiv = $("<div>");
		newDiv.addClass("card").attr('grid-id', userLocation.cityID+'-weather-cards');
		newDiv.attr('id', userLocation.cityID+'-weather-cards'+i);
		$("#"+userLocation.cityID+'-weather-forecast').append(newDiv);
	}
}

function getDayfromNum(num){
	switch (num) {
	    case 0:
	        day = "SUN";
	        break;
	    case 1:
	        day = "MON";
	        break;
	    case 2:
	        day = "TUE";
	        break;
	    case 3:
	        day = "WED";
	        break;
	    case 4:
	        day = "THU";
	        break;
	    case 5:
	        day = "FRI";
	        break;
	    case 6:
	        day = "SAT";
	}
	return day;
}

function populateWeatherWidget(userLocation, forecast){
	$('#'+userLocation.cityID+'-weather-header').html("<div class = row><div class = 'col-xs-4 currWeath'><img src = 'http://"+forecast[0].currentConditionIcon+"' width='100' height='100' alt='Today' class ='img-responsive center-block' id = 'currIcon'></div><div class = 'col-xs-4 currWeath'><div class='currTemp'>"+forecast[0].currentTemp+"&#176;</div></div><div class = 'col-xs-4 currWeath'>"+forecast[0].currentCondition+"</div></div><div class ='row' id = 'currTime'>"+forecast[0].currentTime+"</div>");

	$("#"+userLocation.cityID+'-weather-cards'+'1').html("<img src = 'http://"+forecast[1].dayOneConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+userLocation.cityID+'-weather-cards'+'1').prepend(forecast[1].dateOne);
	$("#"+userLocation.cityID+'-weather-cards'+'1').append(forecast[1].dayOneCondition, "<br> " ,Math.round(forecast[1].dayOneMaxTemp), "&#176;/", Math.round(forecast[1].dayOneMinTemp)+"&#176;");

	$("#"+userLocation.cityID+'-weather-cards'+'2').html("<img src = 'http://"+forecast[2].dayTwoConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+userLocation.cityID+'-weather-cards'+'2').prepend(forecast[2].dateTwo);
	$("#"+userLocation.cityID+'-weather-cards'+'2').append(forecast[2].dayTwoCondition, "<br> " ,Math.round(forecast[2].dayTwoMaxTemp), "&#176;/", Math.round(forecast[2].dayTwoMinTemp)+"&#176;");

	$("#"+userLocation.cityID+'-weather-cards'+'3').html("<img src = 'http://"+forecast[3].dayThreeConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+userLocation.cityID+'-weather-cards'+'3').prepend(forecast[3].dateThree);
	$("#"+userLocation.cityID+'-weather-cards'+'3').append(forecast[3].dayThreeCondition, "<br> " ,Math.round(forecast[3].dayThreeMaxTemp), "&#176;/", Math.round(forecast[3].dayThreeMinTemp)+"&#176;");

	$("#"+userLocation.cityID+'-weather-cards'+'4').html("<img src = 'http://"+forecast[4].dayFourConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+userLocation.cityID+'-weather-cards'+'4').prepend(forecast[4].dateFour);
	$("#"+userLocation.cityID+'-weather-cards'+'4').append(forecast[4].dayFourCondition, "<br> " ,Math.round(forecast[4].dayFourMaxTemp), "&#176;/", Math.round(forecast[4].dayFourMinTemp)+"&#176;");
}

function buildWeatherWidget(userLocation, forecast){
	buildWeatherWidgetContainers(userLocation);
	buildWeatherWidgetCards(userLocation);
	init(userLocation);
	populateWeatherWidget(userLocation, forecast);
}

