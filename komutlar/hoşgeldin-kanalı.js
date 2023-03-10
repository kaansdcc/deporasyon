const { EmbedBuilder } = require("discord.js");
const model = require("../models/guilds");
module.exports = {
    name: "hoşgeldin-kanalı",
    description: 'Hoşgeldin mesajının gideceği kanalı ayarlarsınız',
    type: 1,
    options: [
       {
            name: "ayarla",
            description: "Hoşgeldin mesajının gideceği kanalı ayarlar",
            type: 1,
            options: [{ 
             name: "kanal", 
             description: "Hoşgeldin mesajının gideceği kanal", 
             type: 7, 
             channel_types: [0], 
             required: true 
           }],
        },
        {
            name: "sıfırla",
            description: "Hoşgeldin mesajının gideceği kanalı sıfırlar",
            type: 1,
            options: [],
        }
    ],
    run: async (client, interaction) => {
       if(!interaction.member.permissions.has("ManageGuild")) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız."}]})
        if (interaction.options.getSubcommand() == "ayarla") {
            await model.updateOne({ GuildID: interaction.guildId }, { addChannel: interaction.options.getChannel("kanal").id }, { upsert: true });
            interaction.reply({
                embeds: [{
                    title: "Hoşgeldin Kanalı Başarıyla ayarlandı",
                    description: `Hoşgeldin mesajının gideceği kanal ${interaction.options.getChannel("kanal")} olarka ayarlandı artık mesajlar oraya gidecek`,
                }]
            })
        } else {
            await model.updateOne({ GuildID: interaction.guildId }, { addChannel: null }, { upsert: true });
            interaction.reply({
                embeds: [{
                    title: "Hoşgeldin Kanalı Başarıyla sıfırlandı",
                }]
            })
        }           
 }
};