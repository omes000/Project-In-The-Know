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
console.log("This is Database", database);


//Button for adding data

// $("#btn btn-default").on("click", function(event) {
// event.preventDefault();

// Function that finds data to save   
function addToFirebase(newPlace){
	console.log("Data to Save:");
	database.ref().push(newPlace);
	
};
  

// Create Firebase event for adding data to the database 

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log("New thing added", childSnapshot.val());

	buildCityCards(childSnapshot.val());
	getWeather(childSnapshot.val());
	displayNews(childSnapshot.val());

	//var newPlace = childSnapshot.val().place;
	//console.log (newPlace);
});

	
	//buildCityCards(childSnapshot.val());
	//getWeather(childSnapshot.val());
	//displayNews(childSnapshot.val());



