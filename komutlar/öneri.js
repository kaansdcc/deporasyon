const { Discord, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
module.exports = {
    name: 'öneri',
    description: 'Bota Eklenmesi Gereken Şeyler İçin Öneri Verirsiniz',
    type: 1,
    options: [],
    run: async (client, interaction) => {
   const modal = new ModalBuilder()
                .setCustomId('oneri-modal')
                .setTitle('JoinManager+ Öneri Verme')

            const oneriveri = new TextInputBuilder()
                .setCustomId('oneri')
                .setLabel('Öneriniz')
                .setStyle(TextInputStyle.Short)
                .setMinLength(1)
                .setPlaceholder('Örn: ping komudu yenilensin')
                .setRequired(true)

            const firstActionRow = new ActionRowBuilder().addComponents(oneriveri)
            modal.addComponents(firstActionRow)

            await interaction.showModal(modal)
 }
};