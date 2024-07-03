const { SlashCommandBuilder } = require("discord.js");
const { searchsong, playsong } = require("../../functions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("shuffles the queue"),

  run: async (client, interaction) => {
    const serverQueue = client.queue[interaction.guild.id];
    if (!serverQueue || !serverQueue.queue.length > 0)
      return interaction.reply("nothing to shuffle");

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const values = Array.from(serverQueue.queue.values());

    const currentSong = values.shift(); // get rid of first one since its the current song

    const shuffled = shuffleArray(values);

    (serverQueue.queue = [currentSong, ...shuffled]),
      interaction.reply("I have shuffled the play list :)");
  },
};
