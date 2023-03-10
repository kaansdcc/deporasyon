const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("croxydb")
module.exports = {
	name: "ayarlar",
	description: "Bot Korumayı Açar",
	type: 1,
	options: [],
	run: async (client, interaction, args) => {

    const embed = new Discord.EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('<:icon_settings:1030788024277147718> JoinManager+ Ayarları')
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || "https://static.wikia.nocookie.net/youtube/images/6/64/Discord.jpg/revision/latest?cb=20210513153543")
    .addFields(
      { name: '</ayrıldı-kanalı ayarla:1011427006837166101>', value: `${db.fetch(`oneriLog_${interaction.guild.id}`) ? "<:a_dbc_onay:1009108862927904789>":"<:icons_Wrong:1009117755187937330>"}`, inline: true},
      { name: '</ayrıldı-mesajı ayarla:1015207137418428507>', value: `${db.fetch(`kufurengel_${interaction.guild.id}`) ? "<:a_dbc_onay:1009108862927904789>":"<:icons_Wrong:1009117755187937330>"}`, inline: true},
      { name: '</hoşgeldin-kanalı ayarla:1011427098272989214>', value: `${db.fetch(`hgbb_${interaction.guild.id}`) ? "<:a_dbc_onay:1009108862927904789>":"<:icons_Wrong:1009117755187937330>"}`, inline: true},
      { name: '</hoşgeldin-mesajı ayarla:1015207140438331392>', value: `${db.fetch(`kanal_${interaction.guild.id}`) ? "<:a_dbc_onay:1009108862927904789>":"<:icons_Wrong:1009117755187937330>"}`, inline: true},
      )
    .setFooter({ text:  `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp()

    interaction.reply({ embeds: [embed] })

    }
}