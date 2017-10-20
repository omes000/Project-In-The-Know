/* Weather Widget
Create all container divs for the Weather Widget. The Weather Widget has 3 main containers:
	1. The overall weather Widget container that contains the next two items below:
	2. The header container that contains the current weather information
	3. The forecast container that contains the weather information for the next 4 days*/

function buildTimeWeatherWidgetContainers(userLocation, forecast){
	var weatherWidgetContainer = $("#"+userLocation.cityID+'-weather-container');
	var weatherWidget = $("<div>");
	var weatherWidgetHeader = $("<div>");
	var weatherWidgetCurrent = $("<div>");
	var weatherWidgetForecast = $("<div>");

	var timeWidgetContainer = $("#"+userLocation.cityID+'-time-container');
	var timeWidget = $("<div>");
	var timeWidgetHeader = $("<div>");
	var timeWidgetCityDateRow = $("<div>");
	var timeWidgetTime = $("<div>");

	weatherWidget.addClass('card').attr('id', userLocation.cityID+'-weather-card');
	weatherWidgetHeader.addClass('row weather-card-header').attr('id', userLocation.cityID +'-weather-card-header');
	weatherWidgetCurrent.addClass('row weather-card-current').attr('id', userLocation.cityID + '-weather-card-current');
	weatherWidgetForecast.addClass('weather-card-forecast').attr('id', userLocation.cityID +'-weather-card-forecast');
	weatherWidget.append(weatherWidgetHeader, weatherWidgetCurrent,weatherWidgetForecast);
	weatherWidgetContainer.append(weatherWidget);

	timeWidget.addClass('card').attr('id', userLocation.cityID+'-time-card');
	timeWidgetHeader.addClass('row time-card-header');
	timeWidgetHeader.append("<div class = 'col-sm-5 subtitle-card-main'>" + userLocation.city + "</div>");
	timeWidgetHeader.append("<div class = 'col-sm-6 col-sm-offset-1 pull-right subtitle-card-minor zero-margin date'>" +forecast[0].currentDate.toUpperCase() + "</div>");
	timeWidgetTime.addClass('row time-card-time').append("<div class = 'col-sm-12 showy-text zero-margin current-time'>" + forecast[0].currentTime + "&nbsp;<span class = 'am-pm'>"+forecast[0].currentAMPM+"</span></div>");
	//timeWidgetTime.append("");
	timeWidget.append(timeWidgetHeader, timeWidgetTime);
	timeWidgetContainer.append(timeWidget);



	// $('#'+userLocation.cityID+'-time-weather-container').append("<div class = 'time-widget-container'><div class = 'row time-city-date'><div class ='col-sm-5 subtitle-time'>"+userLocation.city+"</div><div class = 'col-sm-6 col-sm-offset-1 pull-right subtitle-date'>" + forecast[0].currentDate.toUpperCase()+"</div></div><div class = 'row time-time'><div class = 'col-sm-12 currTime'>"+ forecast[0].currentTime+" <span class = 'am-pm'>"+forecast[0].currentAMPM+"</span></div></div></div>");
	//$("#"+userLocation.cityID+'-time-weather-container').append(timeWidget, weatherWidget);
}

var grid;
function init(userLocation){
	grid = new Minigrid({
		container: '#'+userLocation.cityID + '-weather-card-forecast',
		item: userLocation.cityID+'-weather-forecast-minicards',
		gutter: 2
	});
	grid.mount();
}

function update() {
	grid.mount();
}

function buildWeatherWidgetMiniCards(userLocation){
	for (var i = 1; i<5; i++){
		var newDiv = $("<div>");
		newDiv.addClass("weather-forecast-minicards").attr('grid-id', userLocation.cityID+'-weather-forecast-minicards');
		newDiv.attr('id', userLocation.cityID+'-weather-forecast-minicards'+i);
		$("#"+userLocation.cityID+'-weather-card-forecast').append(newDiv);
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

function getWeatherIcons(forecast){
	var icon;
	var forecastCode;
	for (i = 0; i<forecast.length; i++){
		if (i===0){
			forecastCode = String(forecast[i].currentConditionCode);
			if(forecast[i].currentConditionIcon.indexOf("day") !== -1){
				icon = weatherIconObject[forecastCode].day;
				forecast[i].currentConditionNewIcon = icon;
			}
			else{
				icon = weatherIconObject[forecastCode].night;
				forecast[i].currentConditionNewIcon = icon;
			}
		}
		else{
			forecastCode = String(forecast[i].conditionCode);
			if(forecast[i].conditionIcon.indexOf("day") !== -1){
				icon = weatherIconObject[forecastCode].day;
				forecast[i].conditionNewIcon = icon;
			}
			else{
				icon = weatherIconObject[forecastCode].night;
				forecast[i].conditionNewIcon = icon;
			}
		}
	}
}

function populateWeatherWidget(userLocation, forecast){

	$('#' + userLocation.cityID + '-weather-card-header').append("<div class = 'col-lg-5 subtitle-card-main city-conditions'><p class ='zero-margin'>"+userLocation.city+"</p><p class = 'current-condition zero-margin'>" +forecast[0].currentCondition+"</p></div>");

	$('#' + userLocation.cityID + '-weather-card-header').append("<div class = 'col-lg-4 col-lg-offset-3 subtitle-card-minor'><p class = 'wind'>"+forecast[0].currentWindDirection+ " " + forecast[0].currentWindSpeed + " mph </p><p class = 'humidity'> Humidity " + forecast[0].currentHumidity + "%</p></div>");

	for (var i = 0; i < forecast.length; i++){
		if (i===0){
			$('#'+userLocation.cityID+'-weather-card-current').append("<div class = 'col-lg-5 showy-text zero-margin weather-temp'><i class ='wi "+forecast[0].currentConditionNewIcon+"' id = 'currIcon'></i></div>");

			$('#'+userLocation.cityID+'-weather-card-current').append("<div class='col-lg-6 col-lg-offset-1 showy-text weather-temp align-right'>"+forecast[0].currentTemp.toFixed(0)+"&#176; </div></div>");
		}
		else{
			$("#"+userLocation.cityID+'-weather-forecast-minicards'+i).html("<i class ='wi "+forecast[i].conditionNewIcon+" grid-icon col-xs-12'>");
			$("#"+userLocation.cityID+'-weather-forecast-minicards'+i).prepend("<div class = 'col-xs-12 grid-day'>"+forecast[i].date)+"</div>";
			$("#"+userLocation.cityID+'-weather-forecast-minicards'+i).append("<div class = 'col-xs-12 grid-temp'>"+Math.round(forecast[i].maxTemp)+ "&#176;/"+ Math.round(forecast[i].minTemp)+"&#176;</div>");
		}
	}
}

function buildWeatherWidget(userLocation, forecast){
	getWeatherIcons(forecast);
	buildTimeWeatherWidgetContainers(userLocation, forecast);
	buildWeatherWidgetMiniCards(userLocation);
	init(userLocation);
	populateWeatherWidget(userLocation, forecast);
}

