module.exports = {
	name: 'queueToString',
	description: 'Plays the music or adds it to the Queue.',

	async execute(botData) {
	const timeToString = require('./timeToString.js')
  var str = "";
  var time = ""

  if (botData.songs.length <= 1) {
    return "No Songs in Queue"
  }
	var clearence = 0
	if (botData.offset > 1)
		clearence = botData.songs.length - botData.offset

	if (botData.songs.length > botData.offset + 10) {
	  for (i = botData.offset; i < (botData.offset + 10); i++) {
	    //var time = new Date(botData.songs[i].duration * 1000).toISOString().substr(11, 8)
	    console.log(i)
	    time = await timeToString.execute(botData.songs[i].duration)

	    str += `${i}) ` + "[" + botData.songs[i].title +"](" + botData.songs[i].url + ") [" + botData.requesters[i] + "] " + time + "\n"
		}
	} else if (botData.songs.length < (botData.offset + 10) && botData.songs.length > botData.offset && botData.songs.length > 10){
		for (i = botData.offset; i < (botData.songs.length); i++) {
	    //var time = new Date(botData.songs[i].duration * 1000).toISOString().substr(11, 8)
	    //console.log(time)
	    time = await timeToString.execute(botData.songs[i].duration)

	    str += `${i}) ` + "[" + botData.songs[i].title +"](" + botData.songs[i].url + ") [" + botData.requesters[i] + "] " + time + "\n"
		}
	} else {
		for (i = botData.offset; i < botData.songs.length; i++) {
	    //var time = new Date(botData.songs[i].duration * 1000).toISOString().substr(11, 8)
	    //console.log(time)
	    time = await timeToString.execute(botData.songs[i].duration)

	    str += `${i}) ` + "[" + botData.songs[i].title +"](" + botData.songs[i].url + ") [" + botData.requesters[i] + "] " + time + "\n"
		}
	}

	if (botData.songs.length > 10) {
		var pages = Math.floor(botData.songs.length / 10);

		if (botData.offset > 1 && botData.offset < botData.songs.length - 10) {
			//:arrow_left
			const next = botData.client.emojis.find(emoji => emoji.name === 'next');
			const back = botData.client.emojis.find(emoji => emoji.name === 'back');
			const forward = botData.client.emojis.find(emoji => emoji.name === 'forward');
			const backward = botData.client.emojis.find(emoji => emoji.name === 'backward');
			str += `\n${backward}  | ${back} ${botData.offset-1} Songs | ${botData.songs.length - botData.offset} Songs ${next} |  ${forward}`
			botData.react = 3
		} else if (botData.offset == 1) {
			const next = botData.client.emojis.find(emoji => emoji.name === 'next');
			const forward = botData.client.emojis.find(emoji => emoji.name === 'forward');
			//console.log(botData.client.emojis)
			str += `\n${botData.songs.length - (botData.offset + 10)} Songs ${next} |  ${forward}`
			botData.react = 2
		} else {
			const back = botData.client.emojis.find(emoji => emoji.name === 'back');
			const backward = botData.client.emojis.find(emoji => emoji.name === 'backward');
			//console.log(botData.client.emojis)
			str += `\n${backward}  | ${back} ${botData.offset - 1} Songs`
			botData.react = 1
		}

		/*
    if (str.length >= 2048) {
      var index = str.substring(0,str.length-4).lastIndexOf("\n")
      str = str.substring(0, index)
      index = str.substring(0,str.length-4).lastIndexOf("\n")
      str = str.substring(0, index)
      str += "\n***...***"
      //console.log(str)
      break;
			*/
    } else {
			botData.react = 0
		}
		return str;
  }

}
