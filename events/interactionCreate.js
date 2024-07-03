module.exports = async (client, interaction) => {
	try {
		const cmd = interaction.commandName;
		const command = client.slashcommands.get(cmd);
		if (command) {command.run(client, interaction);}

		if(interaction.isButton()) {
			const id = interaction.customId;
			const button = client.buttons.get(id);
			if(!button) return interaction.reply({ content: 'Button not found', ephemeral: true });
			button.run(client, interaction);
		}
	}
	catch (err) {
		interaction.reply('If you see this the bot has given a error please report this to 2MP#7956 ' + err.toString());
		console.log(err);
	}

};