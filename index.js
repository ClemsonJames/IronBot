const Commando = require('discord.js-commando')
const bot = new Commando.Client()
const fs =require("fs")

bot.login(fs.readFileSync('botToken.txt', 'utf8'));


bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('lol', 'League of Legend');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot
    .on('message', function(message) {
        if(message.content == 'Who is Nick') {
            message.channel.sendMessage('Boosted Monkey');
        }
    })
    .on('ready', function() {
        console.log("ready");
    })