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
var input = process.argv.slice(3).join(" ");
// TEST - CAPTURE INPUT - DOD

// URLs

var bandQURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsintown;
var omdbQURL;
var spotifyQURL;

// APPLICATION

if (command === "concert-this") {

    // log the name of the band
    console.log("\n" + input.toUpperCase() + "\n")

    // use axios to return concert info
    axios.get(bandQURL).then(function(res){

        // for each element in the object
        for (i=0; i < res.data.length; i++){

            // log the venue, location, date
            console.log(i+1);
            console.log("---" + "\n" +
                        "Venue: " + res.data[i].venue.name + "\n" +
                        "Location: " + res.data[i].venue.city + "\n" +
                        "Date: " + moment(res.data[i].datetime).format("MM / DD / YYYY") + "\n\n"
            );

        }

    });
}
else if (command  === "spotify-this-song") {

}
else if (command  === "movie-this") {

}
else if (command  === "do-what-it-says") {

} else {
    console.log("Please enter a command.");
}

// capture the arguments
// if the argument euqals the right thing
    // use the package to capture the info
    // display info in the console