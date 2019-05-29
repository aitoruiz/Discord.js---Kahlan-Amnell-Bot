const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let cooldown = new Set();
let cooldownSeconds = 5;

bot.commands = new Discord.Collection();

fs.readdir("./Comandos/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(files => files.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Ops! Não foram encontrados comandos.");
    return;
  }

  console.log(`[i] Carregando comandos, aguarde um instante...`);

  jsfile.forEach((files, i) =>{
    let props = require(`./Comandos/${files}`);
    console.log(`Arquivo ${files} foi carregado com sucesso!`);
    
    bot.commands.set(props.help.name, props);
  });
  
  console.log(`[i] Foram carregados um total de ` + files.length + ` comando(s).`);
});

/*bot.on('ready', function(message) {
  bot.channels.get('386270567252230145').send('Olá! Estou online! Posso ajudar no que desejar!')
});
*/

bot.on("ready", async () => {
  console.log(`${bot.user.username} de Aydindril chegou no servidor!`);
  bot.user.setActivity("Legend of The Seeker", {type: "WATCHING"});
});

bot.on("channelCreate", async channel => {
  console.log(`O canal de texto ${channel.name} foi criado.`);

  let sChannel = channel.guild.channels.find(`name`, "general");
  sChannel.send(`O canal de texto ${channel.name} foi criado.`);
});

bot.on("channelDelete", async channel => {
  console.log(`O canal de texto ${channel.name} foi deletado.`);

  let sChannel = channel.guild.channels.find(`name`, "general");
  sChannel.send(`O canal de texto ${channel.name} foi deletado.`);
});

bot.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send(`${message.author}, você tem que esperar 5 segundos entre os comandos.`)
  }
   
  cooldown.add(message.author.id);

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cooldownSeconds * 1000)

});

bot.login(tokenfile.token);