const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        let serverembed = new Discord.RichEmbed()
            .setTitle("[!] Comando inválido [!]")
            .setAuthor("Aitor Ruiz", "https://i.imgur.com/4T3iVKX.jpg")
            .setColor("#FF0000")
            .setDescription("O que estiver entre <> é necessário, o que estiver entre [] é opcional.")
            .addField("Uso correto: !soltar <Usuário>", "Observe bem o comando escrito.")
            .setTimestamp()
            .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

        return message.channel.send(serverembed);
    } else {
        message.channel.send(`O usuário ${message.author} utilizou o comando !${module.exports.help.name}.`)

        const checkDungeon = bot.channels.get("460869257043902472")
        const member = message.mentions.members.first()
        const channel = bot.channels.get("386270567252230147")

        if (checkDungeon.members.size == 0) {
            let serverembed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle("Masmorras")
            .setDescription(`Não há ninguém nas masmorras para soltar.`)
            .setTimestamp()
            .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");
            return message.channel.send(serverembed);
        } else {
            member.setVoiceChannel(channel);
        }

        message.channel.send(`O usuário ${message.author} soltou ${member.displayName} da masmorra.`)
    }
}

module.exports.help = {
    name: "soltar"
}