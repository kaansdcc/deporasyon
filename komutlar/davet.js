const { EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require("discord.js");
module.exports = {
    name: "davet",
    description: 'Botun Bağlantılarını Bakarsınız',
    type: 1,
    options: [],
    run: async (client, interaction) => {
                  const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Davet Linki!`)
        .setStyle(5)
        .setEmoji("<:paylas:1009017154210902096>")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new ButtonBuilder()
        .setLabel('Destek Sunucusu!')
        .setStyle(5)
        .setEmoji("<:discord:1009016218092576799>")
    .setURL("https://dsc.gg/joinmanager"),
        new ButtonBuilder()
        .setLabel('Oy linki!')
        .setStyle(5)
        .setEmoji("<a:topgg:1009091060334612571>")
    .setURL("https://top.gg/bot/988137460091482233"),
    )
    let invite = new EmbedBuilder()
       .setTitle(`${client.user.username} Botun Bağlantıları`, client.user.avatarURL())
  

    .setDescription("```JoinManager+ botumuzu sunucunuza şimdi davet edin ve gelişmiş özelliklerinin tadını çıkartın!```")
    .setColor(0xFFD700)
    .setTimestamp()
    .setFooter({text:`${interaction.user.tag} Tarafından istendi`, iconURL:interaction.user.displayAvatarURL()}) 
    interaction.reply({ embeds: [invite], components: [row]});
 
 }
};