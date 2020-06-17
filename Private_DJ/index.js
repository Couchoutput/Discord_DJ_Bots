const Discord = require("discord.js");

const ytdl = require("ytdl-core");
const ytsr = require("ytsr")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Spotify = require('spotify-web-api-js');

const {prefix, token,} = require('./config.json')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const queue = new Map();
var s = new Spotify();

var fs = require('fs')
var commandFiles;

async function getFiles(folder) {
  var commands = await fs.readdirSync(folder).filter(file => file.endsWith('.js'));
  return commands
}

//console.log(commandFiles)

// Object that stores information about the DJ
const botData = {
  prefix: prefix,
  admins: new Discord.Collection(),
  couchoutputs: new Discord.Collection(),
  moderators: new Discord.Collection(),
  client: client,
  textChannel: null,
  voiceChannel: null,
  connection: null,
  playing: null,
  queue: null,
  reply: null,
  command: null,
  songs: [],
  volume: 5,
  playing: true,
  requesters: [],
  currentSong: "No Songs to Play",
  currentQueue: "No Songs in Playlist",
  currentReply: "",
  botName: null
};

client.once("ready", async () => {
  // Gets the Bot's Name
  botData.botName = client.user.username
  console.log(`Logged in as ${client.user.tag}!`)

  var admins = client.guilds.find(x => x.name === 'Couchoutput Studios').roles.find(x => x.name === "Admins").members

  for (const admin of admins) {
    botData.admins.set(admin[1].user.username, admin[1].user)
  }

  //console.log(botData.admins)
  var couchoutput = client.guilds.find(x => x.name === 'Couchoutput Studios').roles.find(x => x.name === "Couchoutput").members
  for (const couch of couchoutput) {
    botData.couchoutputs.set(couch[1].user.username, couch[1].user)
  }

  var moderators = client.guilds.find(x => x.name === 'Couchoutput Studios').roles.find(x => x.name === "Moderators").members
  for (const mod of moderators) {
    botData.moderators.set(mod[1].user.username, mod[1].user)
  }
  
  commandFiles = await getFiles('./commands')

  for (const file of commandFiles) {
     const command = await require(`./commands/${file}`)
     client.commands.set(command.name, command)
   }

   const deleteMessages = await require('./util/deleteMessages.js')
   const createPlayingMessage = await require('./util/createPlayingMessage.js')
   const createQueueMessage = await require('./util/createQueueMessage.js')
   const createCommandMessage = await require('./util/createCommandMessage.js')
   const createReplyMessage = await require('./util/createReplyMessage.js')
   const joinVoice = await require('./util/joinVoice.js')

  // Gets the Voice Channel
  botData.voiceChannel = await client.channels.find(x => x.name === botData.botName + " Lounge");

  joinVoice.execute(botData.voiceChannel); // Joines that Voice Channel

  // Gets the controller Text Channel
  var controller = client.channels.find(x => x.name === "sparky-controller");
  botData.textChannel = controller; // Stores the Text Channel

  await deleteMessages.execute(controller); // Deletes all messages in the controller

  // Adds all the DJ's messages to the controller
  const play = await createPlayingMessage.execute(botData);
  const queue = await createQueueMessage.execute(botData);
  const command = await createCommandMessage.execute(botData)
  const reply = await createReplyMessage.execute(botData)

  // Stores the ID's of the DJ's messages
  botData.playing = play;
  botData.queue = queue;
  botData.command = command;
  botData.reply = reply;

  console.log("Ready!");

});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
  const joinVoice = require('./util/joinVoice.js')
  joinVoice.execute(client);
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  const joinVoice = await require('./util/joinVoice.js')
  if(!message.guild.voiceConnection) {
    joinVoice.execute(botData.voiceChannel); // Joines that Voice Channel
  }

  const updateMessage = await require('./util/updateMessage.js')
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    if(message.content.startsWith("https://") || message.content.startsWith("www.") || message.content.startsWith("youtube.com/") ) {
      message.content = "?play " + message.content;
      client.commands.get('execute').execute(client, message, botData);
      return message.delete();
    } else {
      botData.currentReply = "[" + message.author + "] You need to enter a valid command!"
      message.delete();
      return updateMessage.execute(botData)
    }
  }
  if (message.content.startsWith(`${prefix}play`) || message.content.startsWith(`${prefix}Play`)) {
    client.commands.get('execute').execute(client, message, botData);
    return message.delete();
  } else if (message.content.startsWith(`${prefix}skip`) || message.content.startsWith(`${prefix}Skip`)) {
    client.commands.get('skip').execute(message, botData);
    return message.delete();
  } else if (message.content.startsWith(`${prefix}stop`) || message.content.startsWith(`${prefix}Stop`)) {
    client.commands.get('stop').execute(message, botData);
    return message.delete();
  } else {
    botData.currentReply = "[" + message.author + "] You need to enter a valid command!"
    message.delete();
    return updateMessage.execute(botData)
  }

});

client.login(token);
