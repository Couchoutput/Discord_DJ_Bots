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
  guild: null,
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
  botName: null,
  react: 0,
  page: 1,
  pages: null,
  offset: 1
};

const serverCheck = require('./util/serverCheck.js')

client.on("channelDelete", async () => {
  serverCheck.serverCheck(botData)
});

client.once("ready", async () => {
  // Gets the Bot's Name
  botData.botName = client.user.username
  console.log(`Logged in as ${client.user.tag}!`)
  botData.guild = client.guilds.find(x => x.name === 'Couchoutput Studios')

  var admins = botData.guild.roles.find(x => x.name === "Admins").members

  for (const admin of admins) {
    botData.admins.set(admin[1].user.username, admin[1].user)
  }

  //console.log(botData.admins)
  var couchoutput = botData.guild.roles.find(x => x.name === "Couchoutput").members
  for (const couch of couchoutput) {
    botData.couchoutputs.set(couch[1].user.username, couch[1].user)
  }

  var moderators = botData.guild.roles.find(x => x.name === "Moderators").members
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
  //botData.voiceChannel = await client.channels.find(x => x.name === botData.botName + " Lounge");

  //joinVoice.execute(botData.voiceChannel); // Joines that Voice Channel

  // Gets the controller Text Channel
  await serverCheck.serverCheck(botData)



  joinVoice.execute(botData.voiceChannel); // Joines that Voice Channel

  await deleteMessages.execute(botData.textChannel); // Deletes all messages in the controller

  // Adds all the DJ's messages to the controller
  botData.playing = await createPlayingMessage.execute(botData);
  botData.queue = await createQueueMessage.execute(botData);
  botData.command = await createCommandMessage.execute(botData)
  botData.reply = await createReplyMessage.execute(botData)

  console.log("Ready!");

});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
  const joinVoice = require('./util/joinVoice.js')
  joinVoice.execute(botData.voiceChannel);
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on('messageReactionAdd', async (reaction, user) => {
  //console.log(user)
  if (user.bot) return;
  const updateMessage = require('./util/updateMessage.js')
  const queueToString = require('./util/queueToString.js')
  if (reaction.emoji.name === "next") {
    // If the playlist offset is less than the last page, move next one page
    if (botData.offset < botData.songs.length - ((botData.songs.length-1) % 10)) - 10
    botData.offset += 10
    botData.page += 1
  }
  if (reaction.emoji.name === "back") {
    // If the playlist offset is greater than the first page, move back one page
    if (botData.offset > 10) {
      botData.offset -= 10
      botData.page -= 1
    }
  }
  if (reaction.emoji.name === "forward") {
    // IF the playlist offset is less than the last page, move to the last page
    var dif = (botData.songs.length-1) % 10
    if (dif > 0) {
      if (botData.offset < botData.songs.length - dif) {
        botData.offset = botData.songs.length - ((botData.songs.length-1) % 10)
        botData.page = botData.pages
      }
    }
    else {
      if (botData.offset < botData.songs.length - 10) {
        botData.offset = botData.songs.length - 10
        botData.page = botData.pages
      }
    }

  }
  if (reaction.emoji.name === "backward") {
    // If the playlist offset is greater than the first page, move to the first page
    if (botData.offset > 10) {
      botData.offset = 1
      botData.page = 1
    }
  }
  botData.currentQueue = await queueToString.execute(botData)
  updateMessage.execute(botData)
})

client.on('messageReactionRemove', async (reaction, user) => {
  //console.log(user)
  if (user.bot) return;
  const updateMessage = require('./util/updateMessage.js')
  const queueToString = require('./util/queueToString.js')
  if (reaction.emoji.name === "next") {
    // If the playlist offset is less than the last page, move next one page
    if (botData.offset < botData.songs.length - ((botData.songs.length-1) % 10) - 10)
      botData.offset += 10
      botData.page += 1
  }
  if (reaction.emoji.name === "back") {
    // If the playlist offset is greater than the first page, move back one page
    if (botData.offset > 10) {
      botData.offset -= 10
      botData.page -= 1
    }
  }
  if (reaction.emoji.name === "forward") {
    // IF the playlist offset is less than the last page, move to the last page
    var dif = (botData.songs.length-1) % 10
    if (dif > 0) {
      if (botData.offset < botData.songs.length - dif) {
        botData.offset = botData.songs.length - ((botData.songs.length-1) % 10)
        botData.page = botData.pages
      }
    }
    else {
      if (botData.offset < botData.songs.length - 10) {
        botData.offset = botData.songs.length - 10
        botData.page = botData.pages
      }
    }
  }
  if (reaction.emoji.name === "backward") {
    // If the playlist offset is greater than the first page, move to the first page
    if (botData.offset > 10) {
      botData.offset = 1
      botData.page = 1
    }
  }
  botData.currentQueue = await queueToString.execute(botData)
  updateMessage.execute(botData)
})

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
  } else if (message.content.startsWith(`${prefix}shuffle`) || message.content.startsWith(`${prefix}Shuffle`)) {
    client.commands.get('shuffle').execute(botData, message);
    return message.delete();
  }else {
    botData.currentReply = "[" + message.author + "] You need to enter a valid command!"
    message.delete();
    return updateMessage.execute(botData)
  }

});

client.login(token);
