const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const model = require("../models/guilds");
module.exports = {
    name: "ranklar",
    description: 'Davet karşılığı verilen rankları sıralar',
    type: ApplicationCommandType.CHAT_INPUT,
    options: [],
    run: async (client, interaction) => {
        let { ranks } = await model.findOne({ GuildID: interaction.guildId });
    if (!ranks || ranks == []) return interaction.reply("Bu sunucuda ranklarınız yok.");
    let bb = ranks.map(r => `<@&${r.rol}> => ${r.miktar} davet`).join("\n");
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} Adlı Sunucunun Rankları`)
      .setColor(0xFFD700)
      .setFooter({ text: `${client.user.username} Tarafından İstendi.` })

      .setDescription(`${bb ? bb : "Bu sunucuda ranklarınız yok."}`);
      
    interaction.reply({ embeds: [embed] });           
 }
};