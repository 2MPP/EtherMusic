module.exports = {
  id: "skip",
  run: async (client, interaction) => {
    const serverQueue = client.queue[interaction.guild.id];
    await serverQueue.player.stop(interaction.guild.id);

    interaction.reply("I have skipped the current song");
  },
};
