const {EmbedBuilder, ButtonStyle, ButtonBuilder} = require("discord.js");
const discord = require("discord.js")
const moment = require("moment");
  require("moment-duration-format");
  const os = require("os");

  module.exports = {
    name: "istatistik",
    description: "Botun İstatistiğini Görürsünüz.",
    type: 1,
    options: [],
  
    run: async(client, interaction) => {
const cs = new discord.EmbedBuilder()
    const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

    usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
    totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);
    const row = new discord.ActionRowBuilder()
    .addComponents(
    new discord.ButtonBuilder()
    .setLabel("Botu Davet Et")
    .setURL("https://canary.discord.com/api/oauth2/authorize?client_id=988137460091482233&permissions=8&scope=applications.commands%20bot")
    .setEmoji("<:paylas:1009017154210902096>")
    .setStyle(ButtonStyle.Link)
    
    )
    .addComponents(
      new ButtonBuilder()
          .setLabel("Destek Sunucum")
          .setURL(`https://discord.gg/6EqbuJYSfS`)
          .setEmoji("<:discord:1009016218092576799>")
          .setStyle(ButtonStyle.Link)
  )
    const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
    .setDescription(`<a:merhaba:1009015486681460746> **Selam Ben JoinManager+ Sunucularınıza Hizmet Vermek İçin  Buradayım Sizde Eklemek İçin Aşağıdaki __Botu Davet Et__ Butonuna Basınız Destek Sunucumuza Gelmek İçin Aşağıdaki __Destek Sunucusu__ Butonuna Basınız**

    <:tac:1009014742750351451> **Botun Sahipleri:** {[BneWixua](https://discord.com/channels/@me/983295512973312030)},{[Moster](https://discord.com/channels/@me/1034751943530262569)},{[RamoIsReaLoL](https://discord.com/channels/@me/1034752136988328036)}
    <:icons_Person:1009121744642134127> **Kullanıcı Sayısı:** ${client.users.cache.size}
    <:discord:1009016218092576799> **Sunucu Sayısı** ${client.guilds.cache.size}
    <:etiket:1009090596968857742> **Kanal Sayısı** ${client.channels.cache.size}

    <:highconnection:1009015038704615444> **Botun Pingi:** ${client.ws.ping}
    <:djs:1029301686382112829> **Discord.JS sürüm:** ${discord.version}
    <:nodejs:1009015641149296640> **Node.JS sürüm:** v16.14.2
    <:kurulum:1009090863600783480> **Bot Kuruluş:** (10/03/2021)
    `)
    .setImage('https://media.discordapp.net/attachments/984602478815371294/993255495307628615/unknown-5-1.png')
    .setColor("Green")
  .setTimestamp()
  await interaction.reply({embeds: [embed], components: [row]}).catch(async err => {
      await interaction.user.send({embeds: [cs]}).catch(async err => {
      })
  })
  }
}