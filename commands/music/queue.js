const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { searchsong, playsong } = require("../../functions");
const { Rest } = require("lavacord");
const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the queue of the server"),

  run: async (client, interaction) => {
    const serverQueue = client.queue[interaction.guild.id];
    if (!serverQueue || !serverQueue.queue.length > 0)
      return interaction.reply("There is no queue to show....");

    await interaction.deferReply();

    const node = client.manager.idealNodes[0];

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`${interaction.guild.name} Music Queue`);

    for (let i = 0; i < serverQueue.queue.length; i++) {
      const info = await Rest.decode(node, serverQueue.queue[i]);

      if (i == 0) {
        await embed.addFields({
          name: "Current song",
          value: `[${info.info.title}](${info.info.uri})`,
        });
      } else {
        await embed.addFields({
          name: `No. ${i + 1}`,
          value: `[${info.info.title}](${info.info.uri})`,
        });
      }
    }
    await wait(2000);
    interaction.editReply({ embeds: [embed] });
  },
};
