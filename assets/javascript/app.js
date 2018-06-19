$(document).ready(function () {


    // Initialize Firebase 
    var config = {
        apiKey: "AIzaSyBAD-pKg5Pc3qdvpEFnVvSqi6QrrjXhL8k",
        authDomain: "train-scheduler-fa2a8.firebaseapp.com",
        databaseURL: "https://train-scheduler-fa2a8.firebaseio.com",
        projectId: "train-scheduler-fa2a8",
        storageBucket: "",
        messagingSenderId: "541992568309"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var time = "";
    var frequency = "";

    // Updating the page in real-time when the Firebase database changes.
    database.ref().on(
        "value",
        function (snapshot) {
            // If Firebase has name, role, start, and rate stored 
            if (
                snapshot.child("name").exists() &&
                snapshot.child("destination").exists() &&
                snapshot.child("time").exists() &&
                snapshot.child("frequency").exists()
            ) {
                // Set the variables for name, role, start, and rate equal to the stored values in Firebase. 
                name = name;
                destination = destination;
                time = time;
                frequency = frequency;

                // Log the data to the console. 
                console.log(name);
                console.log(destination);
                console.log(time);
                console.log(frequency);
            }
        },

        $("#addTrainBtn").on("click", function (event) {

            // Prevent the page from refreshing
            event.preventDefault();

            // Get inputs
            var name = $("#name")
                .val()
                .trim();
            var destination = $("#destination")
                .val()
                .trim();
            var time = $("#time")
                .val();
            var frequency = $("#frequency")
                .val()
                .trim();

            // Change what is saved in firebase
            database.ref().push({
                name: name,
                destination: destination,
                time: time,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }));

    // Adding trains to database and adding a row underneath the previous train
    trainData.on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;
        
        // Calculate the minutes until next train arrival
        // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
      
		var diffTime = moment().diff(moment.unix(trainTime), "minutes");
		var remainder = moment().diff(moment.unix(trainTime), "minutes") % firebaseFrequency ;
		var minutesAway = trainFrequency - remainder;      
      
        // To calculate the arrival time, add the minutesAway to the currrent time
        var nextArrival = moment().add(minutes, "m").format("hh:mm A");


        console.log(minutesAway);
        console.log(nextArrival);

        console.log(moment().format("hh:mm A"));
        console.log(nextArrival);
        console.log(moment().format("X"));

        // Add each train's data into the table 
        $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    });

})