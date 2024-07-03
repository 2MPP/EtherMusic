const fs = require('fs');
const path = require('path');
const ascii = require('ascii-table');
const buttonsAscii = new ascii('Buttons Loaded');
buttonsAscii.setHeading('Command', 'Load status');

const buttonHandler = (client) => {

	const buttonFolder = path.join(__dirname, '../buttons');
	const buttons = fs.readdirSync(buttonFolder).filter(file => file.endsWith('.js'));

	for (const button of buttons) {
		const buttonFile = require(`${buttonFolder}/${button}`);
		client.buttons.set(buttonFile.id, buttonFile);
		buttonsAscii.addRow(buttonFile.id, '✅');
	}
	console.log(buttonsAscii.toString());


};
module.exports = buttonHandler;