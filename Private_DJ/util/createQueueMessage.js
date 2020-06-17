module.exports = {
	name: 'createQueueMessage',
	description: 'Creates the DJ\'s Queue Message',

	async execute(botData) {
    var msg = await botData.textChannel.send({embed: {
      color: 0xe9e949,
      title: `${botData.botName}'s Playlist`,
      description: "No Songs in Playlist"
     }
   })
   return msg.id
  }
}
