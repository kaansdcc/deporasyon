const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, ComponentType } = require("discord.js");
module.exports = {
    name: "yardım",
    description: 'Bottaki Tüm Komutları Görürsünüz',
    type: 1,
    options: [],
    run: async (client, interaction) => {		 
      
   
const embeds = {
    yardım: new EmbedBuilder()
       .setTitle(`${client.user.username} Yardım Menüsü`)
       .setColor(0xFFD700)
       .addFields( 
                  { name: "/ayrıldı-kanalı ayarla", value: "Ayrıldı mesajının gideceği kanalı ayarlarsınız", inline: true },
                  { name: "/ayrıldı-kanalı sıfırla", value: "Ayrıldı mesajının gideceği kanalı sıfırlarsınız", inline: true },
                  { name: "/ayrıldı-mesaj ayarla", value: "Ayrıldı kanalına  gideceği mesajı ayarlarsınız", inline: true },
                  { name: "/ayrıldı-mesaj sıfırla", value: "Ayrıldı kanalına  gideceği mesajı sıfırlarsınız", inline: true },
                  { name: "/hoşgeldin-kanalı ayarla", value: "Hoşgeldin mesajının gideceği kanalı ayarlarsınız", inline: true },
                  { name: "/hoşgeldin-kanalı sıfırla", value: "Hoşgeldin mesajının gideceği kanalı sıfırlarsınız", inline: true },
                  { name: "/hoşgeldin-mesaj ayarla", value: "Hoşgeldin kanalına gideceği mesajını ayarlarsınız", inline: true },
                  { name: "/hoşgeldin-mesaj sıfırla", value: "Hoşgeldin kanalına gideceği mesajını sıfırlarsınız", inline: true },
                  { name: "/rank ekle", value: "Davet karşılığı verilecek rol ayarlarsınız", inline: true },
                  { name: "/rank sil", value: "Davet karşılığı verilen rolü silersiniz", inline: true },
                  { name: "/ranklar", value: "Sunucuda Ayarlı bütün rankları gösterir", inline: true },
                  { name: "/davet ekle", value: "Belirtilen kişiye belirtilen miktarda davet ekler", inline: true },
                  { name: "/davet sil", value: "Belirtilen kişiden belirtilen miktarda daveti siler", inline: true },
                  { name: "/davetlerim", value: "Davet bilgilerinizi gösterir", inline: true },
                  { name: "/otorol ayarla", value: "otorol komudunu ayarlarsınız", inline: true },
                  { name: "/otorol sıfırla", value: "otorol komudu sıfırlarsınız", inline: true },
                    )
              .setImage('https://media.discordapp.net/attachments/984602478815371294/993255495307628615/unknown-5-1.png'),
      
    ayarlar: new EmbedBuilder()
         .setTitle(`${client.user.username} Ayarlar Menüsü`)
              .setColor(0xFFD700)
              .addFields(
                  { name: "{kullanıcı.tag}", value: `Kullanıcının tagı (${interaction.member.user.tag})`, inline: true },
                  { name: "{kullanıcı.username}", value: `Kullanıcının Kullanıcı adı (${interaction.member.user.username})`, inline: true },
                  { name: "{kullanıcı}", value: `Kullanıcının kendi kendisi (${interaction.member})`, inline: true },
                  { name: "{davetEden.tag}", value: `Davet eden kişinin tagı (${client.user.tag})`, inline: true },
                  { name: "{davetEden.username}", value: `Davet eden kişinin Kullanıcı adı (${client.user.username})`, inline: true },
                  { name: "{davetEden}", value: `Davet eden kişinin kendi kendisi (${client.user})`, inline: true },
                  { name: "{sunucu-adı}", value:`Sunucunun ismi (${interaction.guild.name}) `,inline: true },
                  { name: "{sunucu-toplamÜye}", value: `Sunucunun toplam kişi sayısı (${interaction.guild.memberCount})`, inline: true },
                  { name: "{davet-kodu}", value: `Davet kodu (.gg/ dan sonra gelen kısım)`, inline: true },
                  { name: "{davet}", value: `Davet linki (https://discord.gg/cATXzjd66H)`, inline: true },
                  { name: "{toplamdavet}", value: `Davet eden kişinin toplam davet sayısı (${Math.floor(Math.random() * 100)})`, inline: true },
                  
              )
              .setImage('https://media.discordapp.net/attachments/984602478815371294/993255495307628615/unknown-5-1.png'), 
      
    diğer: new EmbedBuilder()
    .setTitle(`${client.user.username} Diğer Menüsü`)
              .setColor(0xFFD700)
            .addFields(
                { name: "/davet", value: "Botun linklerini gösterir", inline: true },
                { name: "/ping", value: "Botun Pingini Ölçersiniz", inline: true },
                { name: "/istatistik", value: "Botun istatistiğini görürsünüz", inline: true },
                { name: "/öneri", value: "Bota Eklenmesi Gereken Şeyler İçin Öneri Verirsiniz", inline: true },
                
            )
              .setImage('https://media.discordapp.net/attachments/984602478815371294/993255495307628615/unknown-5-1.png'), 
      
};

   const maineb = new EmbedBuilder()
        .setColor(0xFFD700)
        .setTitle("JoinManager+ Ana Menüsüne Hoşgeldin")
        .setDescription(`> <a:emoji_7:992178692476383325> **Selam Ben JoinManager+ Beni Kullanmak İstermisin Ne Duruyorsun Hemen Aşağıdaki Menüden Sana Lazım Olanları Seç**.`)
      
      
      
const message = await interaction.reply({
    embeds: [maineb],
    fetchReply: true,
    components: [
        {
            components: [
                new SelectMenuBuilder().setCustomId("1").addOptions(
                    ["Yardım", "Ayarlar", "Diğer"].map((d) => ({
                        label: d,
                        value: d.toLowerCase(),
                    }))
                ),
            ],
        },
    ],
});

const collector = message.createMessageComponentCollector({
    componentType: ComponentType.SelectMenu,
    filter(i) {
        return i.user.id === interaction.user.id;
    },
});

collector.on("collect", async (i) => {
    const [value] = i.values;
    i.update({ embeds: [embeds[value]] });
});
}
};