module.exports = {
	name: 'createReplyMessage',
	description: 'Creates the DJ\'s Reply Message',

	async execute(botData) {
    var msg = await botData.textChannel.send({embed: {
      color: 0xe9e949,
      title: `${botData.botName}'s Replies`,
      description: " "
      }
    })
    return msg.id
  }
}
