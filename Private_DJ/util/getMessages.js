module.exports = {
	name: 'getMessages',
	description: 'Gets the message objects for DJ\'s Playing, Queue, and Reply Messages',

	async execute(botData) {
	  var playMsg = await botData.textChannel.fetchMessage(botData.playing).catch(async () => {console.log("Play Message Failed to Repair")})
	  var queueMsg = await botData.textChannel.fetchMessage(botData.queue).catch(async () => {console.log("Queue Message Failed to Repair")})
	  var replyMsg = await botData.textChannel.fetchMessage(botData.reply).catch(async () => {console.log("Reply Message Failed to Repair")})
	  return [playMsg, queueMsg, replyMsg];
	}
}
