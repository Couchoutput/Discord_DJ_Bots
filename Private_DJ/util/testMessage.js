module.exports = {
	name: 'testMessage',
	description: 'Tests whether DJ\'s Playing, Queue, Command, and Reply Messages are valid',

	async execute(channel, messageID) {

    var status = false;

    msg = await channel.fetchMessage(messageID).catch(async () => {
      status = true;
      }
    )

    if (status) {
      return false;
    }

    if (msg.embeds.length == 0) {
      return false;
    }

    return true;
  }
}
