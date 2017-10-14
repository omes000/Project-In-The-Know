
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

  // 2. Button for adding data

  // $("#btn btn-default").on("click", function(event) {
  // event.preventDefault();

  // 3. Grabs user input

  // var newPlace = $("#input-group").val().trim();

  // 4. Creates local "temporary" object for holding data

  //  var newPlace = {
  //   place: placeInfo,
  // };

  // 5. Uploads data to the database
  
  function addToFirebase(argOjt){
      database.ref().push(newPlace);
  };
  

  // 6. Create Firebase event for adding data to the database 

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var newPlace = childSnapshot.val().place;


    });