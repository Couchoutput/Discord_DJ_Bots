module.exports = {


	serverCheck: async function(botData) {
		const testChannels = require('./testChannels.js')
		//get the mins of the current time
		await testChannels.execute(botData)
		}

}
