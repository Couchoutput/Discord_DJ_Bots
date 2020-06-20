module.exports = {
	name: 'repeat',
	description: 'Creates the DJ\'s Playing Message',
  async execute(message, botData) {
		const updateMessage = require('../util/updateMessage.js')

    if (message.member.voiceChannel != botData.voiceChannel) {
      botData.currentReply = "[" + message.author + "] You have to be in " + botData.botName + " Lounge to set repeat!"
      return updateMessage.execute(botData)
    }

		const args = message.content.substring(8);

		if (args == "on") {
			botData.repeat = 1
			updateMessage.execute(botData)
		}
		else if (args == "off") {
			botData.repeat = 0
			updateMessage.execute(botData)
		}
		else {

		}
  }
}
