const { SlashCommandBuilder } = require('discord.js');
const { searchsong, playsong } = require('../../functions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skips the current song'),
	run: async (client, interaction) => {
		const serverQueue = client.queue[interaction.guild.id];
		await serverQueue.player.stop(interaction.guild.id)

		interaction.reply("I have skipped the current song")

	} };