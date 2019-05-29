const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  if(message.member.hasPermission() != "ADMINISTRATOR") return errors.noPerms(message, "Administrador");
  if (!args[0]) {
    let serverembed = new Discord.RichEmbed()
      .setTitle("Comando inválido")
      .setAuthor("Aitor Ruiz", "https://i.imgur.com/4T3iVKX.jpg")
      .setColor("#FF0000")
      .setDescription("O que estiver entre <> é necessário, o que estiver entre [] é opcional.")
      .addField("Uso correto: !limpar <Número de Mensagens>", "Observe bem o comando escrito.")
      .setTimestamp()
      .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

    return message.channel.send(serverembed);
  } else {
    message.channel.send(`O usuário ${message.author} utilizou o comando ${module.exports.help.name}.`)
    
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`O usuário ${message.author} limpou um total de ${args[0]} mensagen(s).`);
    });
  }
}

module.exports.help = {
  name: "limpar"
}
