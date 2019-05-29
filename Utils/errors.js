const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()   
        .setAuthor(message.author.username)
        .addField("Permissão necessária para executar este comando:", perm)
        .setColor("#FF0000");
    
    return message.channel.send(embed);
}