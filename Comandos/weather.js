const Discord = require("discord.js")
const weather = require("weather-js")

module.exports.run = async (bot, message, args) => {
  weather.find({ search: args[0], degreeType: "C" }, function (error, result) {
    if (!args[0]) {
      let serverembed = new Discord.RichEmbed()
        .setTitle("[!] Comando inválido [!]")
        .setAuthor("Aitor Ruiz", "https://i.imgur.com/4T3iVKX.jpg")
        .setColor("#FF0000")
        .setDescription("O que estiver entre <> é necessário, o que estiver entre [] é opcional.")
        .addField("Uso correto: !clima <Cidade>", "Observe bem o comando escrito.")
        .setTimestamp()
        .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

      return message.channel.send(serverembed);
    } else {
      var current = result[0].current;

      const embed = new Discord.RichEmbed()
        .setDescription(`${current.skytext}`)
        .setAuthor(`Clima para ${current.observationpoint}:`)
        .setThumbnail(current.imgUrl)
        .setColor(0x00AE86)
        .addField("Temperatura:", `${current.temperature}° Graus`, true)
        .addField("Sensação Térmica de:", `${current.feelslike}° Graus`, true)
        .addField("Ventos:", current.winddisplay, true)
        .addField("Humidade:", `${current.humidity}%`, true)
        .setTimestamp()
        .setFooter("Enviado por Kahlan Amnell", "https://i.imgur.com/KuxGgbH.png");

      message.channel.send({ embed });

      message.channel.send(`O usuário ${message.author} utilizou o comando ${module.exports.help.name}.`)
    }

    if(error) {
      message.channel.send(error);
    }

  });
  
}

module.exports.help = {
  name: "clima"
}
