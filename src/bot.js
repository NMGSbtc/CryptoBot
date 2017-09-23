// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');
require('dotenv').config()

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.BOT_APP_ID,
  appPassword: process.env.BOT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
  session.send("Hello World");
});