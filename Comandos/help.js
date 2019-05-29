const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.RichEmbed()
    .setAuthor("Aitor Ruiz", "https://i.imgur.com/4T3iVKX.jpg")
    .setTitle("[!] Comandos do Servidor [!]")
    .setColor("#15f153")
    .addField("Você pode utilizar:", "!clima\n!limpar\n!botinfo\n!serverinfo")
    .setTimestamp()
    .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

  message.channel.send(botembed)

  message.channel.send(`O usuário ${message.author} utilizou o comando !${module.exports.help.name}.`)
}

module.exports.help = {
  name: "ajuda"
}
