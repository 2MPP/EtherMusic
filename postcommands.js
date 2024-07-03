const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { readdirSync } = require('fs');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath + '/music').filter(file => file.endsWith('.js'));
console.log(commandFiles)

for (const file of commandFiles) {
	const command = require(`./commands/music/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST().setToken(process.env.token);


(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);


		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.botid, process.env.guildid),
			{ body: commands },
		);
		const dataa = await rest.put(
			Routes.applicationGuildCommands(process.env.botid, "752215538582945837"),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		console.log(`Successfully reloaded ${dataa.length} application (/) commands.`);
	}
	catch (error) {

		console.error(error);
	}
})();
