const { EmbedBuilder } = require("discord.js");
const model = require("../models/guilds")
module.exports = {
    name: "rank",
    description: 'Davet karşılığı verilecek rol ayarlarsınız ve kaldırırsınız',
    type: 1,
    options: [
       {
            name: "ekle",
            description: "Davet karşılığı verilecek rol ayarlarsınız",
            type: 1,
            options: [{
                 name: "rol",
                 description: "Verilecek Rol",
                 type: 8,
                 required: true,
                  },
                  {
                  name: "miktar",
                  description: "Kaç davet yapıldığında verilecek",
                  type: 4,
                  required: true,
                  }],
        },
        {
            name: "sil",
            description: "Davet karşılığı verilen rolü kaldırırsınız",
            type: 1,
            options: [{
                    name: "rol",
                    description: "Ayarladığınız Rolü Silersiniz",
                    type: 8,
                    required: true,
                  },
                  {
                     name: "miktar",
                  description: "Ayarladığınız Daveti Silersiniz",
                  type: 4,
                  required: true,
                 }],
        }
    ],
    run: async (client, interaction) => {
       if(!interaction.member.permissions.has("ManageGuild")) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız."}]})
        if (interaction.options.getSubcommand() == "ekle") {
            let rol = interaction.options.getRole("rol");
    let miktar = interaction.options.getInteger("miktar");
    await model.updateOne({ GuildID: interaction.guildId }, { $push: { ranks: { rol: rol.id, miktar: miktar } } }, { upsert: true });
    interaction.reply({ embeds: [{ title: "Başarılı", description: `${rol} rolü ${miktar} davet karşılığına verilecek.` }] });            

        } else {
            let rol = interaction.options.getRole("rol");
            let miktar = interaction.options.getInteger("miktar");
            
            await model.updateOne({ GuildID: interaction.guildId }, { $pull: { ranks: { rol: rol.id, miktar: miktar } } })
            .then(() => {
              interaction.reply({ embeds: [{ title: "Başarılı", description: `${rol} rolü rankı silindi.` }] });
            })
            .catch(() => {
              interaction.reply({ embeds: [{ title: "Hata", description: `Rank Bulunamadı.` }] });
            })            
   }    
 }
};