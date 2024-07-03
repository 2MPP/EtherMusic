const { Manager } = require("lavacord/dist/discord.js");
const ascii = require("ascii-table");
const { joinVoiceChannel } = require("@discordjs/voice");

const table = new ascii("LavaLink status");
table.setHeading("Lavalink", "Load status");

module.exports = async (client) => {
  const activities = [
    {
      text: "Watching ur Magnets",
      type: "PLAYING",
      status: "online",
    },
  ];

  const nodes = [
    {
      id: "1",
      host: process.env.lavalinkhost,
      port: process.env.lavaport,
      password: process.env.lavapass,
    },
  ];

  client.manager = new Manager(client, nodes);

  console.log(`Bot is running as ${client.user.tag}`);

  try {
    await client.manager.connect();
    table.addRow("lavalink " + nodes[0].id, "✅ Connected ");
  } catch (error) {
    table.addRow("lavalink " + nodes[0].id, "❌  failed to connect");
    console.log(error);
  }

  console.log(table.toString());

  client.manager.on("ready", async (node) => {
    console.log(`Lavalink node ${node.id} ready`);
  });

  client.manager.on("error", (error, node) => {
    console.log(`Lavalink node ${node.id} error: ${error.message}`);
  });

  client.manager.on("disconnect", (__, _, node) => {
    console.log(`Lavalink node ${node.id} disconnected`);
  });

  const exec = require("child_process").exec;
  setInterval(() => {
    exec("git pull", (error, stdout) => {
      const response = error || stdout;
      if (!error) {
        if (response.includes("Already up to date.")) {
          //console.log("Bot already up to date. No changes since last pull");
        } else {
          console.log("pulled");
          client.channels.cache
            .get("1258108956300148807")
            .send(
              "changes to the github detected ```\n" +
                response +
                "\n\n``` make sure to restart the bot"
            );
        }
      }
    });
  }, 30000);
};

// setInterval(() => {
// 	const activity = activities[Math.floor(Math.random() * activities.length)];
// 	client.user.setPresence({ activities: [{ name: activity.text }] });
// }, 10000);
