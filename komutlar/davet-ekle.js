const { EmbedBuilder } = require("discord.js");
const model = require("../models/member");
module.exports = {
    name: "davet",
    description: 'Belirtilen kullanıcıya belirtilen miktarda davet ekler ve siler',
    type: 1,
    options: [
       {
            name: "ekle",
            description: "Belirtilen kullanıcıya belirtilen miktarda davet ekler",
            type: 1,
            options: [{
                    name: "kullanıcı",
                    description: "Davet eklenicek kullanıcı",
                    type: 6,
                    required: true,
                  },
                  {
                    name: "miktar",
                    description: "Davet eklenicek miktar",
                    type: 4,
                    required: true,
                    min_value: 1,
                    max_value: 500,
                  }],
        },
        {
            name: "sil",
            description: "Belirtilen kullanıcıya belirtilen miktarda davetini siler",
            type: 1,
            options: [{
                    name: "kullanıcı",
                    description: "Davet, silinecek kullanıcı",
                    type: 6,
                    required: true,
                  },
                  {
                    name: "miktar",
                    description: "silinecek Davet miktarı",
                    type: 4,
                    required: true,
                    min_value: 1,
                    max_value: 500,
                  }],
        }
    ],
    run: async (client, interaction) => {
       if(!interaction.member.permissions.has("ManageGuild")) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız."}]})
        if (interaction.options.getSubcommand() == "ekle") {
    let miktar = interaction.options.getInteger("miktar");
    let kullanıcı = interaction.options.getMember("kullanıcı");

    await model.updateOne({ GuildID: interaction.guildId, MemberId: kullanıcı.id }, { $inc: { bonus: miktar } }, { upsert: true });
    interaction.reply({ embeds: [{ title: "Başarılı", description: `${kullanıcı} adlı kişiye ${miktar} kadar davet eklendi.` }] });           
        } else {
            let miktar = interaction.options.getInteger("miktar");
            let kullanıcı = interaction.options.getMember("kullanıcı");
            const { bonus } = await model.findOne({ GuildID: interaction.guild.id, MemberId: kullanıcı.id }) || { bonus: 0 };
            if(miktar > bonus) miktar = bonus;
            await model.updateOne({ GuildID: interaction.guildId, MemberId: kullanıcı.id }, { $inc: { bonus: -miktar } }, { upsert: true });
            interaction.reply({ embeds: [{ title: "Başarılı", description: `${kullanıcı} adlı kişinin ${miktar} kadar daveti silindi.` }] });            

        }    
 }
};