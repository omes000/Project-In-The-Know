/*Creating all the container divs for the weather widget. Weather widget has 3 main containers:
	1. The overall weather Widget container that contains the next two
	2. The header container that contains the current weather information
	3. The forecast container that contains the weather information for the next 4 days*/

function buildWeatherWidgetContainers(cityName){
	var weatherWidget = $("<div>");
	var weatherWidgetHeader = $("<div>");
	var weatherWidgetForecast = $("<div>");

	weatherWidget.addClass('weather-widget');
	weatherWidget.attr('id', cityName+'-weather');

	weatherWidgetHeader.addClass('card-header');
	weatherWidgetHeader.attr('id', cityName + '-weather-header');

	weatherWidgetForecast.addClass('forecast');
	weatherWidgetForecast.attr('id', cityName + '-weather-forecast');
	weatherWidget.append(weatherWidgetHeader,weatherWidgetForecast);
	$("#"+cityName+'-weather-area').append(weatherWidget);
}

var grid;
function init(cityName){
	grid = new Minigrid({
		container: '#'+cityName +'-weather-forecast',
		item: cityName+'-weather-cards',
		gutter: 2
	});
	grid.mount();
}

function update() {
	grid.mount();
}

function buildWeatherWidgetCards(cityName){
	for (var i = 1; i<5; i++){
		var newDiv = $("<div>");
		newDiv.addClass("card").attr('grid-id', cityName+'-weather-cards');
		newDiv.attr('id', cityName+'-weather-cards'+i);
		$("#"+cityName+'-weather-forecast').append(newDiv);
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

function populateWeatherWidget(forecast, cityName){
	$('#'+cityName+'-weather-header').html("<div class = row><div class = 'col-xs-4 currWeath'><img src = 'http://"+forecast[0].currentConditionIcon+"' width='100' height='100' alt='Today' class ='img-responsive center-block' id = 'currIcon'></div><div class = 'col-xs-4 currWeath'><div class='currTemp'>"+forecast[0].currentTemp+"&#176;</div></div><div class = 'col-xs-4 currWeath'>"+forecast[0].currentCondition+"</div></div><div class ='row' id = 'currTime'>"+forecast[0].currentTime+"</div>");

	$("#"+cityName+'-weather-cards'+'1').html("<img src = 'http://"+forecast[1].dayOneConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+cityName+'-weather-cards'+'1').prepend(forecast[1].dateOne);
	$("#"+cityName+'-weather-cards'+'1').append(forecast[1].dayOneCondition, "<br> " ,Math.round(forecast[1].dayOneMaxTemp), "&#176;/", Math.round(forecast[1].dayOneMinTemp)+"&#176;");

	$("#"+cityName+'-weather-cards'+'2').html("<img src = 'http://"+forecast[2].dayTwoConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+cityName+'-weather-cards'+'2').prepend(forecast[2].dateTwo);
	$("#"+cityName+'-weather-cards'+'2').append(forecast[2].dayTwoCondition, "<br> " ,Math.round(forecast[2].dayTwoMaxTemp), "&#176;/", Math.round(forecast[2].dayTwoMinTemp)+"&#176;");

	$("#"+cityName+'-weather-cards'+'3').html("<img src = 'http://"+forecast[3].dayThreeConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+cityName+'-weather-cards'+'3').prepend(forecast[3].dateThree);
	$("#"+cityName+'-weather-cards'+'3').append(forecast[3].dayThreeCondition, "<br> " ,Math.round(forecast[3].dayThreeMaxTemp), "&#176;/", Math.round(forecast[3].dayThreeMinTemp)+"&#176;");

	$("#"+cityName+'-weather-cards'+'4').html("<img src = 'http://"+forecast[4].dayFourConditionIcon+"' width = '40' height = '40' class = 'img-responsive center-block'>");
	$("#"+cityName+'-weather-cards'+'4').prepend(forecast[4].dateFour);
	$("#"+cityName+'-weather-cards'+'4').append(forecast[4].dayFourCondition, "<br> " ,Math.round(forecast[4].dayFourMaxTemp), "&#176;/", Math.round(forecast[4].dayFourMinTemp)+"&#176;");
}

function buildWeatherWidget(cityName, forecast){
	buildWeatherWidgetContainers(cityName);
	buildWeatherWidgetCards(cityName);
	init(cityName);
	populateWeatherWidget(forecast, cityName);
}

