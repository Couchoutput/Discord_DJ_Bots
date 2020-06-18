module.exports = {
	name: 'testChannels',
	description: 'Creates the DJ\'s Command Message',

	async execute(botData) {

		const createChannels = require('./createChannels.js')

		var controller = await botData.client.channels.find(x => x.name === "sparky-controller");
		var voice = await botData.client.channels.find(x => x.name === botData.botName + " Lounge");

		if (!controller) {
			await createChannels.execute(botData, "text")
		} else {
			botData.textChannel = controller;
		}

		if (!voice) {
			await createChannels.execute(botData, "voice")
		} else {
			botData.voiceChannel = voice;
		}
	}
}
