const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
module.exports = {
    name: 'ping',
    description: 'Botun Pingine Bakarsınız',
    type: 1,
    options: [],
    run: async (client, interaction) => {
   const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Yenile!')
            .setStyle(1)
            .setEmoji("<a:plantio_online:1017703409568190556>")
            .setCustomId('ping-yenile')
        )

       const embed = new EmbedBuilder()
            .setTitle('JoinManager+ Bot Ping Değerleri')
           .addFields([
                 	{ name: '<:highconnection:1009015038704615444> Ping', value: `${client.ws.ping} ms`},
                    { name: '<:highconnection:1009015038704615444> Mesaj Pingi', value: `${(Date.now() - interaction.createdAt)} ms` },
                             ])
            .setColor('Gold')

      
      await interaction.reply({ embeds: [embed], components: [button] })
    
 }
};