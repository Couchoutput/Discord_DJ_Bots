module.exports = {
	name: 'createPlayingMessage',
	description: 'Creates the DJ\'s Playing Message',
  async execute(botData) {
  var msg = await botData.textChannel.send({embed: {
    color: 0xe9e949,
    title: `${botData.botName} is Now Playing`,
    description: "No Songs to Play"
   }
 })
 //console.log("Create Playing Message")
 //console.log(Number(msg.id))
 return msg.id
}
}
