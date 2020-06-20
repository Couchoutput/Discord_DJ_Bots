module.exports = {
	name: 'queueMessage',
	description: 'Sends the new DJ\'s Queue Message',

	async execute(msg, botData) {

		if (botData.repeat == 1) {
		    await msg.edit({embed: {
		      color: botData.color,
		      title: `${botData.botName}'s Playlist [ ${botData.repeatIcon} ]`,
		      description: botData.currentQueue
		     }
		   })
		 }
		 else {
			 await msg.edit({embed: {
				 color: botData.color,
				 title: `${botData.botName}'s Playlist`,
				 description: botData.currentQueue
				}
			})
		 }
		 const next = botData.client.emojis.find(emoji => emoji.name === 'next');
		 const back = botData.client.emojis.find(emoji => emoji.name === 'back');
		 const forward = botData.client.emojis.find(emoji => emoji.name === 'forward');
		 const backward = botData.client.emojis.find(emoji => emoji.name === 'backward');

		 if (botData.react == 1) {
			 //await msg.clearReactions().catch(error => console.error('Failed to clear reactions: ', error))
			 msg.react(backward)
			 msg.react(back)
			 msg.react(next)
			 msg.react(forward)
		 }
	 /*
	 else if (botData.react == 2) {
		 await msg.clearReactions().catch(error => console.error('Failed to clear reactions: ', error))
		 msg.react(next)
		 msg.react(forward)

	 } else if (botData.react == 1){
		 await msg.clearReactions().catch(error => console.error('Failed to clear reactions: ', error))
		 msg.react(backward)
		 msg.react(back)

	 } */else {
		 msg.clearReactions().catch(error => console.error('Failed to clear reactions: ', error))
	 }
  }
}
