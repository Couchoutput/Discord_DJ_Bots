module.exports = {
	name: 'shuffle',
	description: 'Plays the music or adds it to the Queue.',

	async execute(botData, message) {
		const updateMessage = require('../util/updateMessage.js')
		const queueToString = require('../util/queueToString.js')

		if (botData.songs.length > 0) {
			var tempSong = botData.songs[0]
			var tempRequester = botData.requesters[0]
			var tempSongs = botData.songs.slice(1)
			var tempRequesters = botData.requesters.slice(1)
			shuffle(tempSongs, tempRequesters)

			tempSongs.splice(0,0,tempSong)
			tempRequesters.splice(0,0,tempRequester)

			botData.songs = tempSongs
			botData.requesters = tempRequesters

			botData.currentQueue = await queueToString.execute(botData);
	    botData.currentReply = "";
	    updateMessage.execute(botData)
		}
		else {
			botData.currentReply = "[" + message.author + "] I cannot shuffle an empty playlist!"
      updateMessage.execute(botData)
		}

	}

}

function shuffle(obj1, obj2) {
	var index = obj1.length;
	var rnd, tmp1, tmp2;

	while (index) {
		rnd = Math.floor(Math.random() * index);
		index -= 1;
		tmp1 = obj1[index];
		tmp2 = obj2[index];
		obj1[index] = obj1[rnd];
		obj2[index] = obj2[rnd];
		obj1[rnd] = tmp1;
		obj2[rnd] = tmp2;
	}
}
