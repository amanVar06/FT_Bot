require("dotenv").config();

const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

// const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
// const { User, Message, GuildMember, ThreadMember } = Partials;

const fs = require("fs");

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");

for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => {
      file.endsWith(".js");
    });

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(token);

client
  .login(client.config.token)
  .then(() => {
    loadEvents(client);
    loadCommands(client);
  })
  .catch((err) => console.log(err));
