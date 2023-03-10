const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const db = require("croxydb")
const ms = require("ms")
module.exports = {
    name: "eval",
    description: 'Botun Sahibine Özel Komut',
    type: 1,
    options: [],
    run: async (client, interaction) => {
      const modal = new ModalBuilder()
                .setCustomId('eval-modal')
                .setTitle('retro code')

            const oneriveri = new TextInputBuilder()
                .setCustomId('eval')
                .setLabel('Öneriniz')
                .setStyle(TextInputStyle.Paragraph)
                .setMinLength(1)
                .setPlaceholder('console.log("JoinManager+")')
                .setRequired(true)

            const firstActionRow = new ActionRowBuilder().addComponents(oneriveri)
            modal.addComponents(firstActionRow)

            await interaction.showModal(modal)     
 }
};