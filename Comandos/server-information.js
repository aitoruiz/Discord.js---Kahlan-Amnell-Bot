const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let serverembed = new Discord.RichEmbed()
    .setAuthor("Aitor Ruiz", "https://i.imgur.com/4T3iVKX.jpg")
    .setDescription("[!] Informações do Servidor [!]")
    .setColor("#15F153")
    .addField("Nome do Servidor:", message.guild.name)
    .addField("Criado em:", message.guild.createdAt)
    .addField("Você entrou em:", message.member.joinedAt)
    .addField("Total de membros:", message.guild.memberCount)
    .setTimestamp()
    .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

  message.channel.send(serverembed);

  message.channel.send(`O usuário ${message.author} utilizou o comando !${module.exports.help.name}.`);
}

module.exports.help = {
  name: "serverinfo"
}
