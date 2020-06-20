module.exports = {
	name: 'playingMessage',
	description: 'Sends the new DJ\'s Playing Message',

	async execute(msg, botData) {
    //console.log(await message.channel.fetchMessage("721497366091530301")) // 721497366091530301
    await msg.edit({embed: {
      color: botData.color,
      title: `${botData.botName} is Now Playing`,
      description: botData.currentSong
      }
    });
  }
}
