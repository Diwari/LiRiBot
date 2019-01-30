require("dotenv").config();
let Spotify = require("node-spotify-api");
let axios = require("axios");
let moment = require("moment");
let keys = require("./keys.js");
var fs = require("fs");


// we've instantiated the Spotify constructor
// This assumes we've declared a variable "Spotify" in our code
let spotify = new Spotify(keys.spotify);

let userCommand = process.argv[2];
let userSearch = process.argv[3];




function getBand(userSearch){
    let bandUrl = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
    axios.get(bandUrl).then(function(response){
        console.log("Venue: " + response.data[0].venue.name)
        console.log("Date: " + response.data[0].datetime)
        console.log("City : " + response.data[0].venue.city);
    });
}
function getSong(userSearch){
    if(userSearch === undefined){
        userSearch = "The Sign";
    }
    spotify.search({ type: 'track', query: userSearch, limit:1 }, 
    function(err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log('--------------------');
        console.log("Artist(s): " +response.tracks.items[0].artists[0].name); 
        console.log("Song Title: " + response.tracks.items[0].name );
        console.log("Preview Link: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log('--------------------');
      });
    //spotify
    // .search({ type: 'track', query: userSearch, limit:1 })
    // .then(function(response) {
    //   console.log(response);
    // })
    // .catch(function(err) {
    //   console.log(err);
    // });
    
  

}
function getMovie(userSearch){
if(userSearch === undefined){
            userSearch = "Mr. Nobody"
    }
    let omdbUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
    
    axios.get(omdbUrl).then(function(response){
        
        console.log("Movie Title: " + response.data.Title);
        console.log("Release Date: " + response.data.Year);
        console.log("imdbRating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes score: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Staring: " + response.data.Actors);
    });
};

function doWhatItSay(){
    
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        var dataArr = data.split(",");
        //command
        userCommand = dataArr[0]
        //search
        userSearch = dataArr[1]
        if(userCommand === "spotify-this-song" ){
            getSong(userSearch);
        } else if( userCommand === "concert this" ){
            getBand(userSearch);
        } else if( userCommand === "movie-this"){
            getMovie(userSearch);
        }
        



    })

}



if( userCommand === "concert-this"){
    console.log("Hit Concert-this");
    getBand(userSearch)
}else if(userCommand === "spotify-this-song"){
    console.log("Spotify-this-song Hit");
    getSong(userSearch);
}else if(userCommand === "movie-this"){
    console.log("Movie-this Hit");
    getMovie(userSearch);

}else if(userCommand === "do-what-it-says"){
    console.log("Do-what-it-says Hit");
    doWhatItSay(userCommand);

}else{
    console.log("Please input a valid perameter");
}