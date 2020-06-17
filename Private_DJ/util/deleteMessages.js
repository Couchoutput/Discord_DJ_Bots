module.exports = {
	name: 'deleteMessages',
	description: 'Deletes all the messages in the DJ\'s controller text channel',

  async execute(channel) {
  let fetched;
  do {
    fetched = await channel.fetchMessages({limit: 100});
    channel.bulkDelete(fetched);
  } while(fetched.size >= 2);
  await console.log("Deleted")
}
}
