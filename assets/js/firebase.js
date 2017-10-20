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

	/*when there is an element in the database, the page changes from a Google search style landing page to one where the logo and search bar are at the top*/
	$("#logo-container").removeClass('vert-align height');
	
	//Makes the button to clear all cards/data visible
	$(".remove-cards").addClass('visible');

	//Use the firebase data to generate the city cards. 
	buildCityCards(childSnapshot.val());
	displayNews(childSnapshot.val());
	getWeather(childSnapshot.val());
});

//clears all data from the firebase database, calls on removeCardDivs function
function clearAllCards() {
    database.ref().remove();
    removeCardDivs();
}

/*removes all city cards from the page, makes the page look like a Google Search landing page again, and hides the button to clear all cards/data*/
function removeCardDivs() {
    $(".big-card").remove();
    $("#logo-container").addClass('vert-align height');
    $(".remove-cards").removeClass('visible').addClass('not-visible');
}