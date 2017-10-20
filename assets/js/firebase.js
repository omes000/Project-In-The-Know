/* firebase.js 
Documentation:  https://www.firebase.com/docs/web/quickstart.html */

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDUATTnlzYNBs6L0ymjy5bgCmI7gjmrH_g",
	authDomain: "in-the-know-41648.firebaseapp.com",
	databaseURL: "https://in-the-know-41648.firebaseio.com",
	projectId: "in-the-know-41648",
	storageBucket: "in-the-know-41648.appspot.com",
	messagingSenderId: "820885397072"
};

firebase.initializeApp(config);
var database = firebase.database();

// Function that finds data to save   
function addToFirebase(newPlace){
	database.ref().push(newPlace);
}

// Create Firebase event for adding data to the database 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	$("#logo-container").removeClass('vert-align height');
	
	$(".remove-cards").addClass('visible');

	buildCityCards(childSnapshot.val());
	displayNews(childSnapshot.val());
	getWeather(childSnapshot.val());
});

function clearAllCards() {
    database.ref().remove();
    removeCardDivs();
}

function removeCardDivs() {
    $(".big-card").remove();
    $("#logo-container").addClass('vert-align height');
    $(".remove-cards").removeClass('visible').addClass('not-visible');
}