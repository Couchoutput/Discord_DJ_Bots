module.exports = {
	name: 'createQueueMessage',
	description: 'Creates the DJ\'s Queue Message',

	async execute(botData) {
		var msg;
		if (botData.repeat == 0) {
	    msg = await botData.textChannel.send({embed: {
	      color: botData.color,
	      title: `${botData.botName}'s Playlist`,
	      description: "No Songs in Playlist"
	     }
	   })
	 }
	 else {
		 msg = await botData.textChannel.send({embed: {
			 color: botData.color,
			 title: `${botData.botName}'s Playlist ${botData.repeatIcon}`,
			 description: "No Songs in Playlist"
			}
		})
	 }
   return msg.id
  }
}
