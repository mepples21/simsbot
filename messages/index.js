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

var arrOfMagicSayings = [
  "Sweet!",
  "Muthaf***a",
  "Wanna listen to some Phish?",
  "dude",
  "You rock!",
  "noice",
  "gents...",
  "I need to check with my wife."
]

var randomIndex = Math.round(Math.random() * arrOfMagicSayings.length);

bot.dialog('/', function (session) {
    session.send(arrOfMagicSayings[randomIndex]);
});

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
