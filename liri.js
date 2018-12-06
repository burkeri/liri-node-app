// PACKAGES

// axios
var axios = require("axios");
// dotenv
require("dotenv").config();
// moment
var moment = require("moment");
// node-spotify-api
var nodeSpot = require("node-spotify-api");

// KEYS

var keys = require("./keys");
// bandsintown
var bandsintown = keys.bands.apiKey;
// omdb
var omdb = keys.omdb.apiKey;
// spotify
var spotify = keys.spotify;

// ARGUMENT VARIABLES

// user command
var command = process.argv[2];
// user input
var inputArray = [];
for (i=3; i < process.argv.length; i++) {
    inputArray.push(process.argv[i]);
}
var input = inputArray.join(" ");
console.log(input);

// PROGRAM

//concert-this
//spotify-this-song
//movie-this
//do-what-it-says

if (input === "concert-this") {

}
else if (input  === "spotify-this-song") {

}
else if (input  === "movie-this") {

}
else if (input  === "do-what-it-says") {

} else {
    console.log("Please enter a command.");
}

// capture the arguments
// if the argument euqals the right thing
    // use the package to capture the info
    // display info in the console