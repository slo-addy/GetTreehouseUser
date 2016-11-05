var profile = require("./profile.js");
const readline = require('readline');
var username;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Which Treehouse user would you like to lookup? ', (answer) => {
  // TODO: Log the answer in a database
  username = answer;
  rl.close();
});

rl.on('close', (input) => {
    console.log('Searching for user', username);
    profile.get(username);
});