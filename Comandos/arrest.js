const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        let serverembed = new Discord.RichEmbed()
            .setTitle("[!] Comando inválido [!]")
            .setAuthor("Aitor Ruiz", "https://i.imgur.com/4T3iVKX.jpg")
            .setColor("#FF0000")
            .setDescription("O que estiver entre <> é necessário, o que estiver entre [] é opcional.")
            .addField("Uso correto: !masmorra <Usuário> [Motivo]", "Observe bem o comando escrito.")
            .setTimestamp()
            .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

        return message.channel.send(serverembed);
    } else {
        message.channel.send(`O usuário ${message.author} utilizou o comando !${module.exports.help.name}.`)

        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        let arrestedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let reason = args.join(" ").slice(21);
        const member = message.mentions.members.first()
        const channel = bot.channels.get("460869257043902472")

        if (!arrestedUser) {
            return message.channel.send("Não foi possível encontrar o usuário.");
        } else if (!message.member.voiceChannel) {
            return message.channel.send("O usuário informado não está conectado no canal de voz.");
        } else {
            let serverembed = new Discord.RichEmbed()
                .setColor("#FF0000")
                .setTitle("Masmorras")
                .setDescription(`O usuário ${message.author} colocou ${member.displayName} na masmorra.`)
                .addField("Motivo:", reason)
                .setTimestamp()
                .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

            return message.channel.send(serverembed);
        }
    }
}

module.exports.help = {
    name: "prender"
}