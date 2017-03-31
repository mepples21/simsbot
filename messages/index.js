"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

var mattPhrases = [
  "Sweet!",
  "Muthaf***a",
  "Wanna listen to some Phish?",
  "dude",
  "You rock!",
  "noice",
  "gents...",
  "I need to check with my wife.",
  "I love Dave Matthews Band!"
]

randomIndex = mattPhrases[Math.floor(Math.random()*mattPhrases.length)];

bot.dialog('/', function (session) {
    session.send(randomIndex);
});

// delete mattPhrases;
// delete randomIndex;
randomIndex = (function(){}());

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
