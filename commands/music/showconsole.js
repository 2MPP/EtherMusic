const { SlashCommandBuilder } = require("discord.js");
const { searchsong, playsong } = require("../../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showmeshit")
    .setDescription("stops bot from playing music"),
  run: async (client, interaction) => {
    console.log(client.queue);
  },
};
