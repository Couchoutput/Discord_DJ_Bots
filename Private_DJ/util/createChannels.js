module.exports = {
	name: 'createChannels',
	description: 'Creates the DJ\'s Command Message',

	async execute(botData, type) {

		var server = botData.client.guilds.find(x => x.name === 'Couchoutput Studios')
		let category = server.channels.find(c => c.name == "Music Lounges" && c.type == "category");

		if (!category) {
			return new Error("Category channel does not exist");
		}

		if (type === "text") {
			const createPlayingMessage = await require('./createPlayingMessage.js')
			const createQueueMessage = await require('./createQueueMessage.js')
			const createCommandMessage = await require('./createCommandMessage.js')
			const createReplyMessage = await require('./createReplyMessage.js')

		  await server.createChannel("sparky-controller", {type: 'text', parent: category}).catch(console.error);

		  botData.textChannel = await botData.client.channels.find(x => x.name === "sparky-controller");

			botData.playing = await createPlayingMessage.execute(botData);
			botData.queue = await createQueueMessage.execute(botData);
			botData.command = await createCommandMessage.execute(botData)
			botData.reply = await createReplyMessage.execute(botData)
		} else {

			const joinVoice = await require('./joinVoice.js')

		  await server.createChannel(`${botData.botName} Lounge`, {type: 'voice', parent: category}).catch(console.error);

		  botData.voiceChannel = await botData.client.channels.find(x => x.name === `${botData.botName} Lounge`);

			joinVoice.execute(botData.voiceChannel);
		}
  }
}
