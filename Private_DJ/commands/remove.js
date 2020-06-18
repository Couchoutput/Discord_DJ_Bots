module.exports = {
	name: 'remove',
	description: 'Plays the music or adds it to the Queue.',

	async execute(botData) {
	const timeToString = require('./timeToString.js')
  var str = "";
  var time = ""

  if (botData.songs.length <= 1) {
    return "No Songs in Queue"
  }

  for (i = 1; i < botData.songs.length; i++) {
    //var time = new Date(botData.songs[i].duration * 1000).toISOString().substr(11, 8)
    //console.log(time)
    time = await timeToString.execute(botData.songs[i].duration)

    str += `${i}) ` + "[" + botData.songs[i].title +"](" + botData.songs[i].url + ") [" + botData.requesters[i] + "] " + time + "\n"

    if (str.length >= 2040) {
      var index = str.substring(0,str.length-4).lastIndexOf("\n")
      str = str.substring(0, index)
      index = str.substring(0,str.length-4).lastIndexOf("\n")
      str = str.substring(0, index)
      str += "\n***...***"
      //console.log(str)
      break;
    }
  }
	console.log("Bot")
	console.log(str)
  return str;
}
}
