// PACKAGES

// axios
var axios = require("axios");
// dotenv
require("dotenv").config();
// moment
var moment = require("moment");
// node-spotify-api
var nodeSpotifyApi = require("node-spotify-api");

// KEYS

var keys = require("./keys");
// bandsintown
var bandsintown = keys.bands.apiKey;
// omdb
var omdb = keys.omdb.apiKey;
// spotify
var spotify = new nodeSpotifyApi(keys.spotify);

// ARGUMENT VARIABLES

// user command
var command = process.argv[2];
// user input
var input = process.argv.slice(3).join(" ");

// URLs

var bandQURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsintown;
var omdbQURL;
var spotifyQURL = "https://api.spotify.com/v1/search?q=" + input + "&type=track";

// APPLICATION

if (command === "concert-this") {

    // log the name of the band
    console.log("\n" + input.toUpperCase() + "\n")

    // use axios to return concert info
    axios.get(bandQURL).then(function (res) {

        // for each element in the object
        for (i = 0; i < res.data.length; i++) {

            // log the venue, location, date
            console.log(i + 1);
            console.log("---" + "\n" +
                "Venue: " + res.data[i].venue.name + "\n" +
                "Location: " + res.data[i].venue.city + "\n" +
                "Date: " + moment(res.data[i].datetime).format("MM / DD / YYYY") + "\n\n"
            );

        }

    })
    // if there is an error, return error message and code
    .catch(function (err) {
        console.log("Error: " + err);
    })
}
else if (command === "spotify-this-song") {

    if (!input) {
        
        spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE").then(function(res){

            // log the name of the searched song
            console.log("\nSEARCH TERM: the sign\n");

            console.log(1);
            console.log("---" + "\n" +
                "Song: " + res.name + "\n" +
                "Album: " + res.album.name + "\n" +
                "Artist: " + res.artists[0].name + "\n" +
                "URL: " + res.external_urls.spotify + "\n\n"
            );

        })        
        // if there is an error, return error message and code
        .catch(function (err) {
            console.log("Error: " + err);
        })
    } 
    else {

        spotify.request(spotifyQURL).then(function (res) {

            // log the name of the searched song
            console.log("\nSEARCH TERM: " + input + "\n")
    
            // if there is no input
          
            // for each element in the object
            for (i = 0; i < res.tracks.items.length; i++) {
    
                // log the song, album, artist, and url
                console.log(i + 1);
                console.log("---" + "\n" +
                    "Song: " + res.tracks.items[i].name + "\n" +
                    "Album: " + res.tracks.items[i].album.name + "\n" +
                    "Artist: " + res.tracks.items[i].artists[0].name + "\n" +
                    "URL: " + res.tracks.items[i].external_urls.spotify + "\n\n"
                );
    
            }
    
        })
        // if there is an error, return error message and code
        .catch(function (err) {
            console.log("Error: " + err);
        })

    }

    
}
else if (command === "movie-this") {

}
else if (command === "do-what-it-says") {

} else {
    console.log("Please enter a command.");
}

// capture the arguments
// if the argument euqals the right thing
    // use the package to capture the info
    // display info in the console