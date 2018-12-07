// PACKAGES

// axios
var axios = require("axios");
// dotenv
require("dotenv").config();
// fs
var fs = require("fs");
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
var omdbQURL = "https://www.omdbapi.com/?apikey=" + omdb + "&t=" + input;
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

        spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE").then(function (res) {

            // log the name of the searched song
            console.log("\nDEFAULT\n");

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
                console.log("" + err);
            })
    }
    else {

        spotify.request(spotifyQURL).then(function (res) {

            // log the name of the searched song
            console.log("\nSEARCH TERM: " + input + "\n");

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
            console.log("" + err);
        })

    }

}
else if (command === "movie-this") {

    // log the name of the movie
    console.log("\n" + input.toUpperCase() + "\n")

    if (!input) {

        console.log("\nDEFAULT\n")

        axios.get("https://www.omdbapi.com/?apikey=" + omdb + "&t=mr%20nobody").then(function (res){

            console.log(res.data.Title);
            console.log("---" + "\n" +
                "Year: " + res.data.Year + "\n" +
                "IMDB Rating: " + res.data.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + res.data.Ratings[1].Value + "\n" +
                "Country: " + res.data.Country+ "\n" +
                "Language: " + res.data.Language+ "\n" +
                "Plot: " + res.data.Plot + "\n\n"
            );

        })
        // if there is an error, return error message and code
        .catch(function (err) {
            console.log("" + err);
        })
    }
    else {

        axios.get(omdbQURL).then(function (res) {

            console.log(res.data.Title);
            console.log("---" + "\n" +
                "Year: " + res.data.Year + "\n" +
                "IMDB Rating: " + res.data.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + res.data.Ratings[1].Value + "\n" +
                "Country: " + res.data.Country+ "\n" +
                "Language: " + res.data.Language+ "\n" +
                "Plot: " + res.data.Plot + "\n\n"
            );

        })
        // if there is an error, return error message and code
        .catch(function (err) {
            console.log("" + err);
        })

    }

}
else if (command === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(err, text){

        // if there is an error, return error message and code
        if (err) {
            console.log("" + err);
        }
        var command = text.slice(0, 17);
        var input = text.slice(19,37);

        spotify.request("https://api.spotify.com/v1/search?q=" + input + "&type=track").then(function (res) {

            // log the name of the searched song
            console.log("\nSEARCH TERM: " + input + "\n");

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
            console.log("" + err);
        })
    })

}

// opening:
function hello(){

    if (!input && !command) {
        console.log("\nHello my name is...\n");
        console.log("\n\n##        ##    ######     ##");
        console.log("##        ##    ##   ##    ##");
        console.log("##	  ##    #####      ##");
        console.log("##	  ##    ##   ##    ##");
        console.log("#######   ##    ##    ##   ##\n\n");
        console.log("----------------------------------\n");
        console.log("L.I.R.I stands for Language Interpretation \nand Recognition Interface. I may not be as \nvocal as my sister, Siri, but I can still \ngrant you access to a plethora of data.\n");
        console.log("Please enter a command to get started.\n")
        console.log("COMMANDS:\n\n" +
                    "concert-this: " + "Enter 'node liri.js concert-this <band name>' to find info on bands playing near you.\n" +
                    "spotify-this-song: " + "Enter 'node liri.js spotify-this-song <song name>' to find spotify info on your favourite song.\n" +
                    "movie-this: " + "Enter 'node liri.js movie-this <movie name>' to find info on your a movie.\n" +
                    "do-what-it-says: " + "Enter 'node liri.js do-what-it-says' for a random command.");
        console.log("\n----------------------------------\n");
    }

}

hello();
