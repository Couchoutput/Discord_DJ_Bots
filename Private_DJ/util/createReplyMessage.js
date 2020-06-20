module.exports = {
	name: 'createReplyMessage',
	description: 'Creates the DJ\'s Reply Message',

	async execute(botData) {
    var msg = await botData.textChannel.send({embed: {
      color: botData.color,
      title: `${botData.botName}'s Replies`,
      description: " "
      }
    })
    return msg.id
  }
}
