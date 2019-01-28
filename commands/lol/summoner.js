const Commando = require('discord.js-commando')
const TeemoJS = require('teemojs')
const discord = require('discord.js')
const fs =require("fs")
let api = TeemoJS(fs.readFileSync('APIToken.txt', 'utf8'))

module.exports = class summonerCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: 'summoner',
            group: 'lol',
            memberName: 'summoner',
            description: 'looks up a summoners info'
        });
    }
 
    async run(message, args) {
        
        const name = args;
        const summoner = await api.get('na1', 'summoner.getBySummonerName', name);

        try {
        const league = await api.get('na1', 'league.getAllLeaguePositionsForSummoner', summoner.id);
        const match = await api.get('na1', 'spectator.getCurrentGameInfoBySummoner', summoner.id);

        message.channel.send('http://na.op.gg/summoner/userName=' + name);

        var inGame = '';
        var varGameType = '';
        var solo;
        var flex;
        var min = 0;
        var sec = 0;
        for (var i = 0; i < league.length; i++) {
            if (league[i].queueType == 'RANKED_FLEX_SR')
                flex = i;
            else if (league[i].queueType == 'RANKED_SOLO_5x5')
                solo = i;
        }

        if (match == null) {
            inGame = 'Not in a match';
        }
        else {
            if (match.gameType == 'CUSTOM_GAME') {
                varGameType = 'Custom';
            }
            else {
                switch(match.gameMode) {
                    case 'CLASSIC':
                        if (match.gameQueueConfigId == 420) {
                            varGameType = 'Ranked Solo';
                        }
                        else if (match.gameQueueConfigId == 440) {
                            varGameType = 'Ranked Flex';
                        }
                        else if (match.gameQueueConfigId == 460 || match.gameQueueConfigId == 470) {
                            varGameType = 'Twisted Treeline';
                        }
                        else {
                            varGameType = 'Normal';
                        }
                        break;
                    case 'ARAM':
                        varGameType = 'Aram ';
                        break;
                    case 'URF':
                        varGameType = 'Urf ';
                        break;
                    case 'GAMEMODEX':
                        varGameType = 'Nexus Blitz';
                        break;
                    case 'ONEFORALL':
                        varGameType = 'One of All';
                        break;
                }
            }
            min = Math.floor(match.gameLength/60);
            sec = match.gameLength%60;
            inGame = 'In Game - ' + varGameType + ' ' + min + ":" + sec;
        }
        if (solo != null) {
            solo = '**Rank(Solo Queue): **' + league[solo].tier + ' ' + league[solo].rank + ' ' + league[solo].leaguePoints + 
            ' LP Winrate: ' + Math.round(league[solo].wins/(league[solo].wins+league[solo].losses)*100) + '%\n' +
            ' **Position: **' + league[solo].position + '\n';
        }
        else {
            solo = '**Rank(Solo Queue): **Unranked\n';
        }
        if (flex != null) {
            flex = '**Rank(Flex Queue): **' + league[flex].tier + ' ' + league[flex].rank + ' ' + league[flex].leaguePoints + 
            ' LP Winrate: ' + Math.round(league[flex].wins/(league[flex].wins+league[flex].losses)*100) + '%\n' +
            '**Position: **' + league[flex].position + '\n';
        }
        else {
            flex = '**Rank(Flex Queue): **Unranked\n';
        }
        

        var embed = new discord.RichEmbed()
            .setTitle(`**Summoner: ${name}**`)
            .setThumbnail('http://avatar.leagueoflegends.com/na1/' + name + '.png')
            .setColor('#00FF00')
            .setDescription(
                '\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**' +
                '\n\n**Summoner Level : **' + summoner.summonerLevel +
                '\n\n' + solo +
                '\n' + flex +
                '\n**Game Status: **' + inGame +
                '\n\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**'
            )
        message.channel.send(embed);
        } catch (error) {
            if (summoner == null) {
                message.reply('The Summoner does not exist.');
            }
        }

    }
}