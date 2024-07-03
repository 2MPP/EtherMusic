const { SlashCommandBuilder } = require("discord.js");
const { searchsong, playsong } = require("../../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause music")
    .addBooleanOption((option) =>
      option
        .setName("option")
        .setDescription("Pause the music")
        .setRequired(true)
    ),

  run: async (client, interaction) => {
    const serverQueue = client.queue[interaction.guild.id];
    serverQueue.player.pause(interaction.options.getBoolean("option"));
    if (interaction.options.getBoolean("option") == true) {
      interaction.reply("I have paused the music");
    } else {
      interaction.reply("I have resumed the music");
    }
  },
};
