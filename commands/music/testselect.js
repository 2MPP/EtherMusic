const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selecttest")
    .setDescription("Pause music"),

  run: async (client, interaction) => {
    const select = new StringSelectMenuBuilder()
      .setCustomId("starter")
      .setPlaceholder("Make a selection!")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Bulbasaur")
          .setDescription("The dual-type Grass/Poison Seed Pokémon.")
          .setValue("bulbasaur"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Charmander")
          .setDescription("The Fire-type Lizard Pokémon.")
          .setValue("charmander"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Squirtle")
          .setDescription("The Water-type Tiny Turtle Pokémon.")
          .setValue("squirtle")
      );

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.reply({
      content: "Choose your starter!",
      components: [row],
    });
  },
};
