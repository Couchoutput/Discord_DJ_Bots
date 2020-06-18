module.exports = {
	name: 'createCommandMessage',
	description: 'Creates the DJ\'s Command Message',

	async execute(botData) {

    var msg = await botData.textChannel.send({embed: {
      color: 0xe9e949,
      title: `${botData.botName}'s Commands`,
      description: `You must be in the ${botData.textChannel} text channel and "${botData.botName} Lounge" voice channel and have been granted Music Rights by ${botData.admins.get('Couchoutput Bot')} to run these commands `,
      fields: [
        {
          name: `**${botData.prefix}play YouTube URL/Name of the song**`,
          value: `Adds a song to ${botData.botName}'s playlist.\nExample: ${botData.prefix}play Don't Stop Believing\nExample: ${botData.prefix}play https://www.youtube.com/song/url`,
        },
        {
          name: `**${botData.prefix}skip (optional) song number**`,
          value: `Skips to another song in ${botData.botName}'s playlist. Default is the next song.\nExample: ${botData.prefix}skip or ${botData.prefix}skip 3`,
        },
				{
					name: `**${botData.prefix}shuffle [back/next]**`,
					value: `Suffles ${botData.botName}'s playlist`,
				},
        {
          name: `**${botData.prefix}stop**`,
          value: `${botData.botName} stops playing music and deletes the playlist.`,
        }
    ]
      }
    })

    return msg.id
  }
}
