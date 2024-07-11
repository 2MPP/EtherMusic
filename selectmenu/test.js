module.exports = {
  id: "starter",
  run: async (client, interaction) => {
    interaction.reply(`You chose ${interaction.values}`);
  },
};
