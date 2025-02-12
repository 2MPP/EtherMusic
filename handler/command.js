const { readdirSync } = require('fs');

const ascii = require('ascii-table');

const table = new ascii('Commands');
table.setHeading('Command', 'Load status');

module.exports = (client) => {
	readdirSync('./commands/').forEach(dir => {
		const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));


		for (const file of commands) {
			const pull = require(`../commands/${dir}/${file}`);

			if (pull.data.name) {
				client.slashcommands.set(pull.data.name, pull);
				table.addRow(file, '✅');
			}
			else {
				table.addRow(file, '❌  -> missing a help.name, or help.name is not a string.');
				continue;
			}
		}
	});

	console.log(table.toString());
};