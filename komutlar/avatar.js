const { ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = {
    name: "avatar",
    description: "avatar komudu",
    type: 2,
    run: async (client, interaction) => {
       
         const member = await interaction.guild.members.fetch(interaction.targetId);
         
     const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`PNG`)
        .setStyle(5)       
        .setURL(`${member.user.displayAvatarURL({size:1024,format:"png"})}`),
        
        new ButtonBuilder()
        .setLabel(`JPG`)
        .setStyle(5)       
        .setURL(`${member.user.displayAvatarURL({size:1024,format:"jpg"})}`),
        
        new ButtonBuilder()
        .setLabel(`WEBP`)
        .setStyle(5)       
        .setURL(`${member.user.displayAvatarURL({size:1024,format:"webp"})}`),
        
        new ButtonBuilder()
        .setLabel(`GIF`)
        .setStyle(5)       
        .setURL(`${member.user.displayAvatarURL({size:1024,format:"gif"})}`),
        )

        interaction.reply({
            embeds:[
              {
                    color: 0xFFD700,
                    image: {url: member.user.displayAvatarURL({size:1024,dynamic:true})}
                }
            ], components: [row]
        })
       
 }
};