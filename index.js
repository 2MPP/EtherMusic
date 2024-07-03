const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();
const { readdir, readdirSync } = require("fs");

const client = new Client({
  messageCacheLifetime: 180,
  messageCacheMaxSize: 200,
  messageSweepInterval: 180,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
readdir("./events", (err, files) => {
  files = files.filter((f) => f.endsWith(".js"));
  files.forEach((f) => {
    const event = require(`./events/${f}`);
    client.on(f.split(".")[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

client.slashcommands = new Collection();
client.buttons = new Collection();
client.queue = new Collection();
require("./handler/buttons.js")(client);

["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

client.login(process.env.token);
//beans
