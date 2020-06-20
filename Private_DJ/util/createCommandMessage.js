module.exports = {
	name: 'createCommandMessage',
	description: 'Creates the DJ\'s Command Message',

	async execute(botData) {

    var msg = await botData.textChannel.send({embed: {
      color: botData.color,
      title: `${botData.botName}'s Commands`,
      description: `You must be in the ${botData.textChannel} text channel and "${botData.botName} Lounge" voice channel and have been granted Music Rights by ${botData.admins.get('Couchoutput Bot')} to run these commands `,
      fields: [
        {
          name: `**${botData.prefix}play [Name of the song/YouTube URL/YouTube Playlist URL]**`,
          value: `Adds a song to ${botData.botName}'s playlist.
					Example: ${botData.prefix}play Don't Stop Believing Journey
					Example: ${botData.prefix}play https://www.youtube.com/song/url
					Example: ${botData.prefix}play https://www.youtube.com/playlist/url`,
        },
        {
          name: `**${botData.prefix}skip (optional) song number**`,
          value: `Skips to another song in ${botData.botName}'s playlist. Default is the next song.\nExample: ${botData.prefix}skip or ${botData.prefix}skip 3`,
        },
				{
					name: `**${botData.prefix}shuffle**`,
					value: `Suffles ${botData.botName}'s playlist`,
				},
				{
					name: `**${botData.prefix}repeat [on/off]**`,
					value: `Turns on or off playlist repeat.\nExample: ${botData.prefix}repeat on`,
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
