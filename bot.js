var cleverbot = require('cleverbot.io'),
    smartbot = new cleverbot([process.env.CLEVERBOT_API_USER || require('./token').CLEVERBOT_API_USER], [process.env.CLEVERBOT_API_KEY || require('./token').CLEVERBOT_API_KEY]);
    smartbot.setNick("Steve");
    smartbot.create(function(err, session) {
        if (err) {
            console.log('cleverbot create fail!');
        } else {
            console.log('cleverbot create success!');
        }
    });


var Botkit = require('botkit');
var os = require('os');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token || require('./token').SLACK_TOKEN // Get Slack bot API token from token.js during development
}).startRTM();

controller.hears('','direct_message,direct_mention,mention',function(bot,message) {
    var msg = message.text;
    smartbot.ask(msg, function(err, response) {
        if (!err) {
            bot.reply(message, response);
        } else {
            console.log('cleverbot err: ' + err);
        }
    });
});