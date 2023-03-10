const { EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "otorol",
    description: 'otorol komudunu ayarlayıp sıfırlarsınız',
    type: 1,
    options: [
       {
            name: "ayarla",
            description: "otorol komudunu ayarlarsınız",
            type: 1,
            options: [{ 
              name: "rol", 
              description: "sunucuya gelene verilecek rol", 
              type: 8,
              required: true
            }],
        },
        {
            name: "sıfırla",
            description: "otorol komudunu sıfırlarsınız",
            type: 1,
            options: [],
        }
    ],
    run: async (client, interaction) => {
       if(!interaction.member.permissions.has("ManageGuild")) return interaction.reply({embeds:[{description: "Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısınız."}]})
        if (interaction.options.getSubcommand() == "ayarla") {

            const role = interaction.options.getRole("rol");
          await db.set(`otorol_${interaction.guild.id}`, role.id);
          interaction.reply({
                embeds: [{
                    title: "Otorol Başarıyla ayarlandı",
                    description: `Artık sunucuya gelene ${role.toString()} rolü verilecek.`,
                }]
            })
        } else {
         await  db.delete(`otorol_${guild.id}`);
         interaction.reply({
                embeds: [{
                    title: "Otorol Başarıyla sıfırlandı",
                }]
            })
        }    
 }
};