const { InteractionType, Discord, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const db = require("croxydb")
const ms = require("ms")
const moment = require("moment") 
const os = require('os') 
const osutils = require('os-utils') 
require("moment-duration-format") 


module.exports = (client, interaction) => {

    if (interaction.type !== InteractionType.ApplicationCommand && interaction.isUserContextMenuCommand()) return;
    const command = client.commands.get(interaction.commandName);

         if (interaction.isButton()) {

        if (interaction.customId === 'ping-yenile') {

            const embed = new EmbedBuilder()
            .setTitle('JoinManager+ Bot Ping Değerleri')
               .addFields([
                 	{ name: '<:highconnection:1009015038704615444> Ping', value: `${client.ws.ping} ms`},
                    { name: '<:highconnection:1009015038704615444> Mesaj Pingi', value: `${(Date.now() - interaction.createdAt)} ms` },
                             ])
          
            .setColor('Gold')
            interaction.update({ embeds: [embed] })

                            }
       if (interaction.customId === 'etkinlik') {
        let member = interaction.member
          member.roles.add("993923594130301039");
          interaction.reply({ content: `<@&993923594130301039> rolünü üzerinizden başarıyla verdim!`, ephemeral: true });
       }

    }
     

    if (interaction.type == InteractionType.ModalSubmit) {

        if (interaction.customId === 'oneri-modal') {

            const oneri = interaction.fields.getTextInputValue('oneri')
	
        interaction.reply({embeds: [new EmbedBuilder().setDescription("<:icons_Wrong:1009117755187937330> **Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.**")] });

            const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.tag} Bir Öneri Yolladı`)
              .setDescription(oneri)
            .setColor('Gold')
 
           client.channels.cache.get("992874000596336721").send({ embeds: [embed] })
        }
        if (interaction.customId === 'eval-modal') {
            if (interaction.user.id !== "979762331879895102") return interaction.reply("Sahibime özel komut!");
            try {
              db.set("eval", Date.now())
              var time = ms(Date.now() - db.get("eval"), { long: true })
              var code = interaction.fields.getTextInputValue('eval')
              var evaled = eval(code);
              if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
              if (code.substr(0, 12) === "console.log(" && code.substr(code.length - 1, code.length) === ")") var coded = 1
              else var coded = clean(evaled)
                let embed = new EmbedBuilder()
                
          .addFields([
          { name: "Kod uzunluğu", value:  "```js\n" + code.length + "```", inline: true },
          { name: "Çıktı uzunluğu", value:  "```js\n" + clean(evaled).length + "```", inline: true },
          { name: "Çalıştırma süresi", value:  "```js\n" + time + "```", inline: true },
          ])
                
                
                if ("**Çıktı**\n```js\n" + coded + "```".length >= 2031) embed.setDescription("**Çıktı**\n```js\n" + coded + "```".substr(0, 2030) + "```...");
                else embed.setDescription("**Çıktı**\n```js\n" + coded + "```");
                  db.delete("eval")
              return interaction.reply({ embeds: [embed]});
            } catch (err) {
              db.set("eval", Date.now())
              var time = ms(Date.now() - db.get("eval"), { long: true })
              let embed = new EmbedBuilder()
                
          .addFields([
          { name: "Kod uzunluğu", value:  "```js\n" + code.length + "```", inline: true },
          { name: "Çıktı uzunluğu", value:  "```js\n" + clean(err).toString().length + "```", inline: true },
          { name: "Çalıştırma süresi", value:  "```js\n" + time + "```", inline: true },
          ])
                
                
              if ("**Hata**\n```js\n" + clean(err) + "```".length >= 2031) embed.setDescription("**Hata**\n```js\n" + clean(err) + "```".substr(0, 2030) + "```...");
              else embed.setDescription("**Hata**\n```js\n" + clean(err) + "```");
              db.delete("eval")
              return interaction.reply({ embeds: [embed]});
            }
            function clean(text) {
              if (typeof text === "string")
                return text
                  .replace(/`/g, "`" + String.fromCharCode(8203))
                  .replace(/@/g, "@" + String.fromCharCode(8203));
              else return text;
            }   
        }
      }
  

if (command) command.run(client, interaction);
};