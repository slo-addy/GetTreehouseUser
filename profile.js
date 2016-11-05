var http = require("http");
var https = require("https");
var fs = require("fs");

function printMessage(username, totalPoints, badgeCount, javaScriptPoints, iosPoints, databasesPoints) {
  var message = "\nUser \"" + username + "\" has " + totalPoints + " total points\n" + badgeCount + " total badge(s)\n" + javaScriptPoints + " points in JavaScript\n" + iosPoints + " points in iOS\n" + databasesPoints + " points in Databases\n";
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

function get(username) {
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function (response) {
    var body = "";
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      if (response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);

          writeJSONToFile(profile);

          /* 
          TODO:
            I want to create a var for the response object
            The object should only store badges/points that are > 0
            This object will be passed to the printMessage() function
           */

          printMessage(username, profile.points.total, profile.badges.length, profile.points.JavaScript, profile.points.iOS, profile.points.Databases);
        } catch (error) {
          printError(error);
        }
      } else {
        printError({ message: "There was an error getting the Treehouse profile for " + username + ". (" + response.statusCode + " " + http.STATUS_CODES[response.statusCode] + ")\nPlease try again" });
      }
    });
  });

  request.on("error", printError);
}

function writeJSONToFile(responseData) {
  console.log("Going to write into response.json");
  fs.writeFile('response.json', JSON.stringify(responseData), function (err) {
    if (err) {
      return console.error(err);
    }

    console.log("Data written successfully!\n");
    console.log("Let's read newly written data\n");
    fs.readFile('response.json', function (err, data) {
      if (err) {
        return console.error(err);
      }
      console.log(JSON.parse(data));
    });
  });
};

module.exports.get = get;