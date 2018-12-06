// PACKAGES

// axios
var axios = require("axios");
// dotenv
require("dotenv").config();
// inquirer
var inquirer = require("inquirer");
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
var spotify = new Spotify(keys.spotify);

// PROGRAM

inquirer.prompt([
    {
        type: "input",
        message:"Enter command:",
        name: "command"
    }
])
.then (function(res){
    
})

// capture the arguments
// if the argument euqals the right thing
    // use the package to capture the info
    // display info in the console