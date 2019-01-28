const Commando = require('discord.js-commando')
const discord = require('discord.js')
const request = require('request')
const cheerio = require('cheerio')
const client = new discord.Client()

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function split(string) {
    if (string != null) {
        var parts = []
        var masteryName
        parts = string.split('/')
        masteryName = parts[1]
        //exceptions
        if (masteryName == 'Triumph.png') {
            masteryName = 'Triumph'
        }
        if (masteryName == 'Overheal.png') {
            masteryName = 'Overheal'
        }
        return masteryName
    }
}

module.exports = class buildCommand extends Commando.Command {

    constructor(client) {
        super(client, {
            name: 'build',
            group: 'lol',
            memberName: 'build',
            description: 'looks up a champion build path using champion.gg'
        });
    }

    async run(message, args) {

        var allChamps = ['Aatrox' , 
'Ahri' , 
'Akali' , 
'Alistar'  ,
'Amumu' ,
'Anivia' ,
'Annie' ,
'Ashe' ,
'Aurelionsol' , 'AurelionSol', 
'Azir' ,
'Bard' ,
'Blitzcrank', 
'Brand' ,
'Braum' ,
'Caitlyn', 
'Camille' ,
'Cassiopeia', 
'Corki' ,
'Darius' ,
'Diana' ,
'Drmundo', 
'Draven', 
'Ekko' ,
'Elise' ,
'Evelynn' ,
'Ezreal' ,
'Fiddlesticks', 
'Fiora' ,
'Fizz' ,
'Galio' ,
'Gangplank', 
'Garen' ,
'Gnar' ,
'Gragas' ,
'Graves' ,
'Heimerdinger', 
'Illaoi' ,
'Ivern' ,
'Irelia' ,
'Janna' ,
'Jarvaniv', 'JarvanIV',
'Jax' ,
'Jayce' ,
'Jhin' ,
'Jinx' ,
'Kaisa' ,
'Kalista' ,
'Karma' ,
'Karthus' ,
'Kassadin', 
'Katarina', 
'Kayle' ,
'Kayn' ,
'Kennen' ,
'Khazix' ,
'Kindred', 
'Kled' ,
'Kogmaw' ,
'Leblanc' , 'LeBlanc',
'Leesin' , 'LeeSin', 
'Leona'  ,
'Lissandra', 
'Lucian', 
'Lulu' ,
'Lux' ,
'Malphite' ,
'Malzahar', 
'Maokai' ,
'Masteryi' ,'MasterYi',
'Missfortune'  ,'MissFortune',
'Mordekaiser' ,
'Morgana' ,
'Nami' ,
'Nasus' ,
'Nautilus' ,
'Neeko',
'Nidalee' ,
'Nocturne', 
'Nunu' ,
'Olaf'  ,
'Orianna'  ,
'Ornn' ,
'Pantheon' , 
'Poppy' ,
'Pyke'  ,
'Quinn' ,
'Rakan'  ,
'Rammus'  ,
'Reksai'  ,
'Renekton',  
'Rengar' , 
'Riven' ,
'Rumble'  ,
'Ryze'  ,
'Sejuani',  
'Shaco'  ,
'Shen'  ,
'Shyvana'  ,
'Singed' ,
'Sion'  ,
'Sivir'  ,
'Skarner'  ,
'Sona'  ,
'Soraka'  ,
'Swain'  ,
'Sylas' ,
'Syndra'  ,
'Tahmkench' , 'TahmKench',
'Taliyah', 
'Talon' ,
'Taric'  ,
'Teemo'  ,
'Thresh'  ,
'Tristana'  ,
'Trundle'  ,
'Tryndamere'  ,
'Twistedfate' , 'TwistedFate',
'Twitch',  
'Udyr' ,
'Urgot'  ,
'Varus'  ,
'Vayne'  ,
'Veigar' , 
'Velkoz',  
'Vi' ,
'Viktor'  ,
'Vladimir'  ,
'Volibear'  ,
'Warwick'  ,
'Wukong'  ,
'Xayah'  ,
'Xerath'  ,
'Xinzhao' , 'XinZhao', 
'Yasuo' ,
'Yorick',  
'Zac'  ,
'Zed'  ,
'Ziggs' , 
'Zilean',  
'Zoe' ,
'Zyra']
        var exist = false
        var src = []
        var skillQ = []
        var skillW = []
        var skillE = []
        var firstSkill = ''
        var secondSkill = ''
        var thirdSkill = ''
        var rune = []
        var n =0
        var champ = capitalizeFirstLetter(args)

        for (var i=0; i<allChamps.length; i++) {
            if (champ == allChamps[i]) {
                exist = true;
            }
        }
        if (exist == false) {
            message.reply('This champion does not exist');
        }
        console.log(exist)
    if (exist == true) {
        request('https://champion.gg/champion/'+champ, function(err, resp, html) {
            if (!err) {
                const $ = cheerio.load(html);
                $('.build-wrapper a').each(function(i, element) {
                    src[n] = ($(element).find('.possible-build.tsm-tooltip').attr('src')).slice(49,53) + 
                    ($(element).find('.possible-build.tsm-tooltip').attr('src')).slice(54);
                    n++;
                });
                
                n=0;
                $('.skill-selections > div').each(function(i, element) {
                    if (n>=18 && n<36) {
                        skillQ[n-18]=$(element).find('span').text();
                    }
                    else if (n>=36 && n<54) {
                        skillW[n-36]=$(element).find('span').text();
                    }
                    else if (n>=54 && n<72) {
                        skillE[n-54]=$(element).find('span').text();
                    }
                    n++;
                });

                n=0;
                $('.PerkButton__Button-gExHPL.jRrxWg').each(function(i,element) {
                    if (n==28) {
                        rune[n-28] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(57);
                    }
                    else if (n==30) {
                        rune[n-29] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(57);
                    }
                    else if (n==32) {
                        rune[n-30] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(57);
                    }
                    else if (n==34) {
                        rune[n-31] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(57);
                    }
                    else if (n==36) {
                        rune[n-32] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(57);
                    }
                    else if (n==41) {
                        rune[n-36] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(68,72)
                        + ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(73);
                    }
                    else if (n==47) {
                        rune[n-41] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(68,72)
                        + ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(73);
                    }
                    else if (n==48) {
                        rune[n-41] = ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(68,72) 
                        + ($(element).find('.PerkButton__Icon-gCfQzY.dEbDdH.PreloadedImage__PreloadedImage-bQgnyH.jYvZWW').attr('src')).slice(73);
                    }
                    n++
                    
                })
                
                if (skillQ[8] != ''){
                    firstSkill = 'q';
                }
                else if (skillW[8] != '') {
                    firstSkill = 'w';
                }
                else if (skillE[8] != '') {
                    firstSkill = 'e';
                }

                if (skillQ[12] != ''){
                    secondSkill = 'q';
                }
                else if (skillW[12] != '') {
                    secondSkill = 'w';
                }
                else if (skillE[12] != '') {
                    secondSkill = 'e';
                }

                if (skillQ[17] != ''){
                    thirdSkill = 'q';
                }
                else if (skillW[17] != '') {
                    thirdSkill = 'w';
                }
                else if (skillE[17] != '') {
                    thirdSkill = 'e';
                }

                var embed = new discord.RichEmbed()                    
                    .setTitle(`**Champion: ${champ}**`)
                    .setThumbnail('http://ddragon.leagueoflegends.com/cdn/9.2.1/img/champion/' + champ + '.png')
                    .setDescription(
                        '**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**' + 
                        '\n\n**Skill Order**\n' + 
                        `:regional_indicator_${firstSkill}:` + ':arrow_right:' +
                        `:regional_indicator_${secondSkill}:` + ':arrow_right:' +
                        `:regional_indicator_${thirdSkill}:` +
                        '\n\n** Core Builds: **\n' +
                        message.client.emojis.find(emoji => emoji.name === src[0]) + 
                        message.client.emojis.find(emoji => emoji.name === src[1]) + 
                        message.client.emojis.find(emoji => emoji.name === src[2]) +
                        message.client.emojis.find(emoji => emoji.name === src[3]) +
                        message.client.emojis.find(emoji => emoji.name === src[4]) +
                        message.client.emojis.find(emoji => emoji.name === src[5]) +
                        '\n\n**Runes:**\n' +
                        message.client.emojis.find(emoji => emoji.name === split(rune[0])) +
                        message.client.emojis.find(emoji => emoji.name === split(rune[1])) +
                        message.client.emojis.find(emoji => emoji.name === split(rune[2])) + '\n' +
                        message.client.emojis.find(emoji => emoji.name === split(rune[3])) +
                        message.client.emojis.find(emoji => emoji.name === split(rune[4])) + '\n' +
                        message.client.emojis.find(emoji => emoji.name === rune[5]) +
                        message.client.emojis.find(emoji => emoji.name === rune[6]) +
                        message.client.emojis.find(emoji => emoji.name === rune[7]) +
                        '\n\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**'
                    )
                    .setColor('#00FF00')
                    .setFooter('The information is based on champion.gg', 'https://champion.gg/img/logo.png');
                message.channel.send(embed);
        }
        });
    }

    }

}
