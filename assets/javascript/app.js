$(document).ready(function () {

    // Initialize Firebase 
    var config = {
        apiKey: "AIzaSyBAD-pKg5Pc3qdvpEFnVvSqi6QrrjXhL8k",
        authDomain: "train-scheduler-fa2a8.firebaseapp.com",
        databaseURL: "https://train-scheduler-fa2a8.firebaseio.com",
        projectId: "train-scheduler-fa2a8",
        storageBucket: "train-scheduler-fa2a8.appspot.com",
        messagingSenderId: "541992568309"
      };
    firebase.initializeApp(config);

    var trainData = firebase.database();

    // Add train button
    $("#addTrainBtn").on("click", function() {

        // // Prevent the page from refreshing
        // event.preventhefault();
    
        var trainName = $("#name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequency").val().trim();

        // New Train
        var newTrain = {
            name: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        }

        trainData.ref().push(newTrain);

        alert("New Train Added!");

        // Empty the form
        $("#name").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");

        console.log(firstTrainTime);
        return false;
        })
    

    trainData.ref().on("child_added", function(snapshot) {
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var firstTrainTime = snapshot.val().firstTrainTime;
        var frequency = snapshot.val().frequency;

        var remainder = moment().diff(moment.unix(firstTrainTime),"minutes")%frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, "m").format("HH:mm A");

        console.log(remainder);
        console.log(minutes);
        console.log(arrival);

    $("#trainTable > tBody").append("<tr><th>" + name + "</th><th>" + destination + "</th><th>" + frequency + "</th><th>" + arrival + "</th><th>" + minutes + "</th></tr>"); 
    
})
})