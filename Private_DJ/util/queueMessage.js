module.exports = {
	name: 'queueMessage',
	description: 'Sends the new DJ\'s Queue Message',

	async execute(msg, botData) {
    await msg.edit({embed: {
      color: 0xe9e949,
      title: `${botData.botName}'s Playlist`,
      description: botData.currentQueue
     }
   })
  }
}
