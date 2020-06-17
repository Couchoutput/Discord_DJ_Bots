module.exports = {
	name: 'joinVoice',
	description: 'Joins the DJ\'s Voice Channel',

	async execute(channel) {
    if (!channel)
      return console.error("The channel does not exist!");
    channel.join().then(connection => {
      // Yay, it worked!
      console.log("Successfully connected.");
    }).catch(e => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    })
  }
}
