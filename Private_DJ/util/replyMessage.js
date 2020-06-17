module.exports = {
	name: 'replyMessage',
	description: 'Sends the new DJ\'s Queue Message',

	async execute(msg, botData) {
    await msg.edit({embed: {
      color: 0xe9e949,
      title: `${botData.botName}'s Replies`,
      description: botData.currentReply
     }
   })
  }
}
