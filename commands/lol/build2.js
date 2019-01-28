const Commando = require('discord.js-commando');
const TeemoJS = require('teemojs');
const discord = require('discord.js');
let api = TeemoJS('RGAPI-df28db16-dc38-4a86-8708-6b4ced8ec28d');
const request = require('request');
const cheerio = require('cheerio');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = class build2Command extends Commando.Command {

    constructor(client) {
        super(client, {
            name: 'build2',
            group: 'lol',
            memberName: 'build2',
            description: 'looks up a champion build path using op.gg THIS DOESNT WORK'
        });
    }

    async run(message, args) {

        var src = [];
        var n =0;
        var data = [];
        var champ = capitalizeFirstLetter(args);

        request('http://na.op.gg/champion/' + champ + '/statistics/', function(err, resp, html) {
            if (!err) { //haha fk op.gg for making this so complex (im just bad at programming)
                const $ = cheerio.load(html);
                $('.champion-stats__list').each(function(i, element) {
                    console.log($(element).find('li').html());
                    if (n>=5 && n <=7) {
                        data[n-5] = $(element).find('li').html();
                    }
                    n++;
                });
                //for(n=0; n<3; n++) {
                //    console.log(data[n]);
                //} 

                var embed = new discord.RichEmbed()                    
                    .setTitle(`**Champion: ${champ}**`)
                    .setThumbnail('http://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/' + champ + '.png')
                    .setColor('#00FF00')
                message.channel.send(embed);
            }
        });

    }

}