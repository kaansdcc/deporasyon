const {
  discord,
  Client,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const fs = require("fs");
const client = new Client({ intents: 7751 });
const ayarlar = require("./config.json");
const db = require("croxydb");
const invite = require("invite.js");
invite.inviteModule(client);
const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})

const log = "1004696581464932423"

process.on("unhandledRejection", (reason, promise) => {})
const mongoose = require("mongoose");
mongoose.connect(ayarlar.mongodb)
.then(() =>console.log("Connect MongoDb"))
  .catch(console.error);

const synchronizeSlashCommands = require("discord-sync-commands");

const { token } = require("./config.json");

client.commands = new Collection();
fs.readdir("./komutlar/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(props.name, {
      name: props,
      ...props,
    });
    console.log(`[Slash] Komut Yüklendi: ${props.name}`);
  });
  synchronizeSlashCommands(
    client,
    client.commands.map((c) => ({
      name: c.name,
      description: c.description,
      options: c.options,
      type: c.type,
    })),
    {
      debug: false,
    }
  );
});

fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Event yüklendi: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(ayarlar.token);

const model = require("./models/guilds");
const memberData = require("./models/member");


client.on("guildMemberAdd", (member) => {
    if (db.has(`otorol_${member.guild.id}`)) {
        member.roles.add(db.get(`otorol_${member.guild.id}`))
          }
          }) 
client.on("guildCreate", async (guild) => {
  const kanal = "992489185518813325"; // Eklendim kanal id

  const owner = await client.users.fetch(guild.ownerId)
  client.channels.cache.get(kanal).send({ content: `
<a:emoji_1:992178356898508890> Bir Sunucuya Eklendim!
Sunucu İsmi: ${guild.name}
Sunucu Kimliği: ${guild.id} 
Kurucu: ${owner.tag}
Kurucu Kimliği: ${owner.id}
Üye Sayısı: ${guild.memberCount}
` })
}) 

client.on("guildDelete", async (guild) => {
  const kanal = "992489185518813325";

  const owner = await client.users.fetch(guild.ownerId)
  client.channels.cache.get(kanal).send({ content: `
<:uzgun:996374750739828766> Bir Sunucudan Atıldım!
Sunucu İsmi: ${guild.name}
Sunucu Kimliği: ${guild.id} 
Kurucu: ${owner.tag}
Kurucu Kimliği: ${owner.id}
Üye Sayısı: ${guild.memberCount}

` })
}) 


client.on("KullaniciKatilma", async (member, invite, inviter, guild) => {
  const kurulus = new Date().getTime() - member.createdAt;
  if (kurulus < 1296000000)
    await memberData.updateOne(
      { GuildID: guild.id, MemberId: inviter.id },
      { $inc: { fake: 1 } }
    );
  const {
    uses = 0,
    bonus = 0,
    fake = 0,
    ayrılan = 0,
  } = (await memberData.findOneAndUpdate(
    { GuildID: guild.id, MemberId: inviter.id },
    { $inc: { uses: 1 } },
    { upsert: true }
  )) || { uses: 0 };
  const { addChannel, addMsg, ranks } = (await model.findOne({
    GuildID: guild.id,
  })) || { addChannel: "", addMsg: "", ranks: [] };
  if (addChannel == "" || addMsg == "") return;
  let toplam = uses + bonus + 1 - fake - ayrılan;
  ranks.map(async (rank) => {
    if (
      toplam >= rank.miktar &&
      !guild.members.cache.get(inviter.id).roles.cache.has(rank.rol)
    ) {
      await guild.members.cache.get(inviter.id).roles.add(rank.rol);
    }
  });
  let mesaj = addMsg
    .replace("{kullanıcı.tag}", member.user.tag)
    .replace("{kullanıcı.username}", member.user.username)
    .replace("{kullanıcı}", member)
    .replace("{davetEden.tag}", inviter.tag)
    .replace("{davetEden.username}", inviter.username)
    .replace("{davetEden}", inviter)
    .replace("{sunucu-adı}", guild.name)
    .replace("{sunucu-toplamÜye}", guild.memberCount)
    .replace("{davet-kodu}", invite.code)
    .replace("{toplamdavet}", toplam);

  guild.channels.cache.get(addChannel).send({ content: `${mesaj}` });
});

client.on("KullaniciAyrilma", async (member, invite, inviter, guild) => {
  const kurulus = new Date().getTime() - member.createdAt;
  if (kurulus < 1296000000)
    await memberData.updateOne(
      { GuildID: guild.id, MemberId: inviter.id },
      { $inc: { fake: -1 } }
    );
  const {
    uses = 0,
    bonus = 0,
    fake = 0,
    ayrılan = 0,
  } = (await memberData.findOneAndUpdate(
    { GuildID: guild.id, MemberId: inviter.id },
    { $inc: { ayrılan: 1 } },
    { upsert: true }
  )) || { uses: 0 };
  const { rmvChannel, rmvMsg, ranks } = (await model.findOne({
    GuildID: guild.id,
  })) || { rmvChannel: "", rmvMsg: "" };
  if (rmvChannel == "" || rmvMsg == "") return;
  let toplam = uses + bonus - 1 - fake - ayrılan;
  ranks.map(async (rank) => {
    if (
      toplam < rank.miktar &&
      guild.members.cache.get(inviter.id).roles.cache.has(rank.rol)
    ) {
      await guild.members.cache.get(inviter.id).roles.remove(rank.rol);
    }
  });
  let mesaj = rmvMsg
    .replace("{kullanıcı.tag}", member.user.tag)
    .replace("{kullanıcıser.username}", member.user.username)
    .replace("{kullanıcı}", member)
    .replace("{davetEden.tag}", inviter.tag)
    .replace("{davetEden.username}", inviter.username)
    .replace("{davetEden}", inviter)
    .replace("{sunucu-adı}", guild.name)
    .replace("{sunucu-toplamÜye}", guild.memberCount)
    .replace("{davet-kodu}", invite.code)
    .replace("{toplamdavet}", toplam);

  guild.channels.cache.get(rmvChannel).send({ content: `${mesaj}` });
});

client.on('interactionCreate', interaction => {

if (interaction.content === 'ayrıl') {
  client.guilds.cache.forEach((item, i) => {

    if (item.memberCount < 5 ) {
      item.leave()
    } else {
      return
    }
  });


}
})