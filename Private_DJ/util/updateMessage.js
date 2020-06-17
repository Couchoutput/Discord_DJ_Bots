module.exports = {
	name: 'updateMessage',
	description: 'Updates the DJ\'s messages.',

	async execute(botData) {
    const deleteMessages = require('./deleteMessages.js')
    const getMessages = require('./getMessages.js')
    const testMessage = require('./testMessage.js')
    const createPlayingMessage = require('./createPlayingMessage.js')
    const createQueueMessage = require('./createQueueMessage.js')
    const createCommandMessage = require('./createCommandMessage.js')
    const createReplyMessage = require('./createReplyMessage.js')
    const playingMessage = require('./playingMessage.js')
    const queueMessage = require('./queueMessage.js')
    const replyMessage = require('./replyMessage.js')

    var playStatus;
    var queueStatus;
    var replyStatus;

    do {
      playStatus = await testMessage.execute(botData.textChannel, botData.playing);
      queueStatus = await testMessage.execute(botData.textChannel, botData.queue);
			commandStatus = await testMessage.execute(botData.textChannel, botData.command);
      replyStatus = await testMessage.execute(botData.textChannel, botData.reply);

      if (!playStatus || !queueStatus || !replyStatus || !commandStatus) {
        await deleteMessages.execute(botData.textChannel);
        botData.playing = await createPlayingMessage.execute(botData);
        botData.queue = await createQueueMessage.execute(botData);
        botData.command = await createCommandMessage.execute(botData);
        botData.reply = await createReplyMessage.execute(botData);
      }

    } while (!playStatus && !queueStatus && !replyStatus && !commandStatus)

    var msg = await getMessages.execute(botData)
    //await console.log(msg)
    await playingMessage.execute(msg[0], botData)
    await queueMessage.execute(msg[1], botData)
    await replyMessage.execute(msg[2], botData)
  }
}
