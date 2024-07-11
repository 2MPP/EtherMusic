const fs = require("fs");
const path = require("path");
const ascii = require("ascii-table");
const selectmenuAscii = new ascii("selectmenu Loaded");
selectmenuAscii.setHeading("Command", "Load status");

const selectmenuhandler = (client) => {
  const selectMenuFolder = path.join(__dirname, "../selectmenu");
  const menus = fs
    .readdirSync(selectMenuFolder)
    .filter((file) => file.endsWith(".js"));

  for (const Selectmenu of menus) {
    const selectMenuFile = require(`${selectMenuFolder}/${menus}`);
    client.selects.set(selectMenuFile.id, selectMenuFile);
    selectmenuAscii.addRow(selectMenuFile.id, "✅");
  }
  console.log(selectmenuAscii.toString());
};
module.exports = selectmenuhandler;
