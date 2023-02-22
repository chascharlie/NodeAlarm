const http = require('http'); // Import http module
const express = require('express'); // Import express module

var app = express(); // Create express application
app.use(express.static(__dirname+"/public")); // Serve static files in public folder

app.get("/start", function (req,res) { // Function taking in HTTP GET request sent to /start and the response
    let alarmDate = [parseInt(req.query.year),parseInt(req.query.month),parseInt(req.query.day),parseInt(req.query.hour),parseInt(req.query.minute)]; // Array containing date details sent in request 
    (function countdown() {
        let d = new Date(); // New Date object
        let currentDate = [d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours(),d.getMinutes()] // Create another array in similar format to alarmDate, this time with current information

        if (arrayIsEqual(currentDate,alarmDate)) { // Check if arrays are equal using function; for some reason we can't use equality operator to compare arrays in JS
            res.jsonp({success: true}); // Tell the client the request was successful; will be used to determine if countdown has finished or not
        }
        else {
            setTimeout(countdown,1000); // Execute countdown again in 1000 milliseconds (1 second)
        }
    })();
});

const arrayIsEqual = (arr1,arr2) => {
    let equal = true; // Equal is true by default
    for (let i = 0; i < arr1.length; i++) { // Loop from i = 0 to length of arr1
        if (arr1[i] !== arr2[i]) { // If item i of arr1 is not the same as item i of arr2, so arrays aren't equal
            equal = false;
            break;
        }
    }
    return equal;
}

const server = http.createServer(app); // Creates a server hosting express application
server.listen(8080); // Listen on port 8080