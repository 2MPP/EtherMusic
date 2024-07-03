/* eslint-disable no-useless-escape */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  formatDate: function (date) {
    return new Intl.DateTimeFormat("us-en").format(date);
  },

  msToTime: function (duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  },

  secondsToHms: function (seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  },
  playsong: async function (client, interaction, base64) {
    const { Rest } = require("lavacord");
    const node = client.manager.idealNodes[0];

    const serverQueue = client.queue[interaction.guild.id];
    if (serverQueue.chanelid == 0) {
      serverQueue.chanelid.push(interaction.channel.id);
    }

    if (base64.loadType == "track") {
      serverQueue.queue.push(base64.data.encoded);
      if (serverQueue.queue.length == 1) {
        serverQueue.player.play(serverQueue.queue[0]);
      }
    } else if (base64.loadType == "search") {
      console.log(base64);
      serverQueue.queue.push(base64.data[0].encoded);
      if (serverQueue.queue.length == 1) {
        serverQueue.player.play(serverQueue.queue[0]);
      }
    }
  },
  searchsong: async function (client, search) {
    const { Rest } = require("lavacord");

    const regex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (regex.test(search) == true) {
      const node = client.manager.idealNodes[0];
      return Rest.load(node, search).catch((err) => {
        console.error(err);
        return null;
      });
    } else {
      const node = client.manager.idealNodes[0];
      return Rest.load(node, "ytsearch:" + search).catch((err) => {
        console.error(err);
        return null;
      });
    }
  },
  decdodeURL: async function (client, b64) {
    const { Rest } = require("lavacord");

    const node = client.manager.idealNodes[0];
    return Rest.decode(node, b46).catch((err) => {
      console.error(err);
      return null;
    });
  },
};
