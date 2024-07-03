module.exports = {
	id: 'test',
	run: async (client, interaction) => {
		interaction.reply('You pressed the button ' + interaction.customId);

	},
};