const { SlashCommandBuilder } = require("discord.js");
const { searchsong, playsong } = require("../../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stops bot from playing music"),
  run: async (client, interaction) => {
    const serverQueue = client.queue[interaction.guild.id];
    delete client.queue[interaction.guild.id];
    await client.manager.leave(interaction.guild.id);
    interaction.reply(
      "I have stopped the music and i am leaving the voice channel <3"
    );
  },
};
