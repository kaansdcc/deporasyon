const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "oyver",
  description: "Bota oy verirsin!",
  type: 1,
  options: [],

  run: async (client, interaction) => {

    const embed = new Discord.EmbedBuilder()
    .setTitle("JoinManager+ Oy Ver")
    .setDescription("```Selam Ben JoinManager+ Bana Oy Vererek Destek Olabilirsin Destek Sunucumuza Gelmek İstersen Aşağıdaki Butona Basabilirsin.```")

    let link_button = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
      .setLabel('Oyver')
      .setEmoji("<a:topgg:1009091060334612571>")
      .setStyle(Discord.ButtonStyle.Link)
      .setURL(`https://discord.gg/kqZCQFatPR`),
      new Discord.ButtonBuilder()
      .setLabel('Destek Sunucum')
      .setEmoji("<:discord:1009016218092576799>")
      .setStyle(Discord.ButtonStyle.Link)
      .setURL("https://discord.gg/kqZCQFatPR"),);
      
    interaction.reply({ embeds: [embed], components: [link_button] })


  }

};