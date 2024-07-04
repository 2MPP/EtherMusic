module.exports = {
  id: "stop",
  run: async (client, interaction) => {
    const serverQueue = client.queue[interaction.guild.id];
    delete client.queue[interaction.guild.id];
    await client.manager.leave(interaction.guild.id);
    interaction.reply(
      "I have stopped the music and i am leaving the voice channel <3"
    );
  },
};
