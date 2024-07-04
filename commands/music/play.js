const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { searchsong, playsong } = require("../../functions");
const { Rest } = require("lavacord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a song")

    .addStringOption((option) =>
      option
        .setName("song")
        .setRequired(true)
        .setDescription("The song name or url")
    ),

  run: async (client, interaction) => {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "You are not in a voice channel",
        ephemeral: true,
      });
    }

    const skip = new ButtonBuilder()
      .setCustomId("skip")
      .setLabel("Skip")
      .setStyle(ButtonStyle.Primary);
    const shuffle = new ButtonBuilder()
      .setCustomId("shuffle")
      .setLabel("Shuffle")
      .setStyle(ButtonStyle.Primary);
    const stop = new ButtonBuilder()
      .setCustomId("stop")
      .setLabel("Stop")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(skip, shuffle, stop);

    const node = client.manager.idealNodes[0];
    if (!client.queue[interaction.guild.id]) {
      const player = await client.manager.join({
        guild: interaction.guild.id,
        channel: interaction.member.voice.channel.id,
        node: "1",
      });

      player.on("end", async (data) => {
        if (data.type === "TrackEndEvent" && data.reason === "replaced") return;
        if (data.type === "TrackEndEvent" && data.reason === "cleanup") return;
        const serverQueue = client.queue[interaction.guild.id];
        serverQueue.queue.shift();

        if (serverQueue.queue.length == 0) {
          await client.manager.leave(interaction.guild.id);
          delete client.queue[interaction.guild.id];
          await client.channels.cache
            .get(serverQueue.chanelid.join(" "))
            .send("The Server queue has finished so i have left the channel");
        } else {
          const serverQueue = client.queue[interaction.guild.id];
          const info = await Rest.decode(node, serverQueue.queue[0]);
          const timeFinish = Math.round(
            (new Date().getTime() + info.info.length) / 1000
          );
          const NowPlaying = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle("Now Playing")
            .setURL(info.info.uri)
            .addFields(
              { name: "Author", value: info.info.author, inline: true },
              { name: "Song", value: info.info.title, inline: true },
              {
                name: "Time To finish",
                value: `<t:${timeFinish}>`,
                inline: true,
              }
            )
            .setImage(info.info.artworkUrl);
          const message = await client.channels.cache
            .get(serverQueue.chanelid.join(" "))
            .send({ embeds: [NowPlaying], components: [row] });

          player.once("end", async (data) => {
            message.delete().catch(console.log);
          });

          serverQueue.player.play(serverQueue.queue[0]);
        }
      });

      client.queue[interaction.guild.id] = {
        queue: [],
        chanelid: [],
        player,
      };
    }

    const song = interaction.options.getString("song");
    const songsearch = await searchsong(client, song);

    if (songsearch.loadType == "empty") {
      return interaction.reply(
        "I coudnt find a song named that please try again"
      );
    }
    playsong(client, interaction, songsearch);

    const serverQueue = client.queue[interaction.guild.id];

    if (serverQueue.queue.length == 0) {
      const info = await Rest.decode(node, songsearch.data[0].encoded);
      const timeFinish = Math.round(
        (new Date().getTime() + info.info.length) / 1000
      );
      const addedtoqueue = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle("Now Playing")
        .setURL(info.info.uri)
        .addFields(
          { name: "Author", value: info.info.author, inline: true },
          { name: "Song", value: info.info.title, inline: true },
          {
            name: "Time To finish",
            value: `<t:${timeFinish}>`,
            inline: true,
          }
        )
        .setImage(info.info.artworkUrl);

      const interact = await interaction.reply({ embeds: [addedtoqueue] });
      player.once("end", async (data) => {
        interact.delete().catch(console.log);
      });
    } else {
      if (songsearch.loadType == "track") {
        const info = await Rest.decode(node, songsearch.data.encoded);
        const addedtoqueue = new EmbedBuilder()
          .setColor(0x00ff00)
          .setTitle("Added to the queue")
          .setURL(info.info.uri)
          .addFields(
            { name: "Author", value: info.info.author, inline: true },
            { name: "Song", value: info.info.title, inline: true }
          )
          .setImage(info.info.artworkUrl);

        interaction.reply({ embeds: [addedtoqueue], ephemeral: true });
      } else {
        const info = await Rest.decode(node, songsearch.data[0].encoded);
        const addedtoqueue = new EmbedBuilder()
          .setColor(0x00ff00)
          .setTitle("Added to the queue")
          .setURL(info.info.uri)
          .addFields(
            { name: "Author", value: info.info.author, inline: true },
            { name: "Song", value: info.info.title, inline: true }
          )
          .setImage(info.info.artworkUrl);

        interaction.reply({ embeds: [addedtoqueue], ephemeral: true });
      }
    }
  },
};
