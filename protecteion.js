const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('NIR0 Develoment'))
app.listen(port, () => console.log(`NIRO PROTECTION IS ACTIVE`))

const { Client } = require("discord.js");
const client = new Client();
const { PREFIX, TOKEN, DEVS } = require("./Bot_Config/config.json")
const { Discord, MessageEmbed } = require("discord.js");
const fs = require("fs");
const moment = require("moment")
const db = require("quick.db");
const prefix = PREFIX;

client.on("ready", async () => {
  client.user.setActivity("protection is active", {
    type: "COMPETING",
  })
  client.user.setStatus("invisible")
  console.log(`[ ${client.user.username} ] is active boost up!`);
});

client.login(TOKEN).catch(err => {
  console.error("[ DISCORD API ] INVIELD TOKEN")
})

client.on("message", function(message) {
  if (message.content.startsWith(prefix + "help")) {
    let messageArgs = message.content.split(" ").slice(1).join(" ");
    let messageRPS = message.content.split(" ").slice(2).join(" ");
    let arrayRPS = ['**# - Rock**', '**# - Paper**', '**# - Scissors**'];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    let help_msg = new MessageEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
      .addField("General", "💬", true)
      .addField("Admins", "🛠️", true)
      .addField("Protection", "🔒", true)
    message.channel.send(help_msg).then(msg => {
      msg.react('💬')
      msg.react('🛠️')
      msg.react('🔒')
        .then(() => msg.react('💬'))
        .then(() => msg.react('🛠️'))
        .then(() => msg.react('🔒'))
      let reaction1Filter = (reaction, user) => reaction.emoji.name === '💬' && user.id === message.author.id;
      let reaction2Filter = (reaction, user) => reaction.emoji.name === '🛠️' && user.id === message.author.id;
      let reaction3Filter = (reaction, user) => reaction.emoji.name === '🔒' && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 20000 });
      let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 19000 });
      let reaction3 = msg.createReactionCollector(reaction3Filter, { time: 18000 });
      reaction1.on("collect", r => {
        const embed = new MessageEmbed()
          .setColor("#000000")
          .addField(`**:newspaper: ❯ ${prefix}id**`,
            `Account Info`, true)
          .addField(`**:newspaper: ❯ ${prefix}user**`,
            `Account Details`, true)
          .addField(`**:frame_photo: ❯ ${prefix}avatar <@member**`,
            `Show Avatar`, true)
          .addField(`**:newspaper: ❯ ${prefix}server**`,
            `Server Info`, true)
          .addField(`**:satellite: ❯ ${prefix}ping**`,
            `Bot Ping`, true)
          .addField(`**:paperclip: ❯ ${prefix}link**`,
            `Bot Link`, true)
        message.channel.send(embed)
      })
      reaction2.on("collect", r => {
        const embed = new MessageEmbed()
          .setColor("#000000")
          .addField(`**:wastebasket: ❯ ${prefix}clear <number>**`, `Delete Messages`, true)
          .addField(`**:hammer_pick: ❯ ${prefix}ban <@user>**`, `Ban Member`, true)
          .addField(`**:lock_with_ink_pen: ❯ ${prefix}unban <ID>**`, `UnBan Member`, true)
          .addField(`**:wrench: ❯ ${prefix}hide**`, `Hide Channel`, true)
          .addField(`**:wrench: ❯ ${prefix}show**`, `Show Channel`, true)
          .addField(`**:wrench: ❯ ${prefix}lock**`, `Close Channel`, true)
          .addField(`**:wrench: ❯ ${prefix}unlock**`, `Open Channel`, true)
          .addField(`**:hammer: ❯ ${prefix}mute/unmute <@user>**`, `Mute/Unmute Member`, true)
          .addField(`**:hammer: ❯ ${prefix}role <@user> <role-name>**`, `Give / Remove Role`, true)
          .addField(`**:hammer_pick: ❯ ${prefix}showbans**`, `Show Bans List`, true)
          .addField(`**:hammer: ❯ ${prefix}kick <@member>**`, `Kick Member`, true)
        message.channel.send(embed)
      })
      reaction3.on("collect", r => {
        const embed = new MessageEmbed()
          .setColor("#000000")
          .addField(`**:lock: ❯ ${prefix}setfake <time>**`, `Determine the age of dummy accounts`, true)
          .addField(`**:lock: ❯ ${prefix}antitoken <on/off>**`, `Enable / Disable Fake Accounts Protection`, true)
          .addField(`**:lock: ❯ ${prefix}antilink <on/off>**`, `Enable / Disable Spreed Protection`, true)
          .addField(`**:lock: ❯ ${prefix}antiinv <on/off>**`, `Enable / Disable Discord Invites Protection`, true)
          .addField(`**:lock: ❯ ${prefix}antisw <on/off>**`, `Enable / Disable Swearing / Cursing Blocker`, true)
          .addField(`**:lock: ❯ ${prefix}anti-sapm**`, `Enable / Disable AntiSpam Protection`, true)
          .addField(`**:lock: ❯ ${prefix}limitbans <num>**`, `Set Bans Limet`, true)
          .addField(`**:lock: ❯ ${prefix}limitkicks <num>**`, ` Set Kicks Limet`, true)
          .addField(`**:lock: ❯ ${prefix}limitroleDelete <num>**`, `Set Role Delet Limet`, true)
          .addField(`**:lock: ❯ ${prefix}limitchannelDelete <num>**`, `Set Channel Delete Limet`, true)
          .addField(`**:lock: ❯ ${prefix}limittime <num>**`, `Set Cooldown to limet orders [with ms!]`, true)       
        message.channel.send(embed)
      })
    })
  }
});
//protection
let antibots = JSON.parse(fs.readFileSync('./data/antibots.json', 'utf8'));
let spread = JSON.parse(fs.readFileSync("./data/spread.json", "utf8"));
let discord = JSON.parse(fs.readFileSync("./data/discord.json", "utf8"));
let swair = JSON.parse(fs.readFileSync("./data/swair.json", "utf8"));
let anti = JSON.parse(fs.readFileSync("./data/antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./data/config.json", "UTF8"));
client.on('message', msg => {
  if (msg.content.startsWith(prefix + "antibots on")) {
    if (!msg.channel.guild) return msg.reply('**This Command Only For Servers**');
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('**Sorry But You Dont Have Permission** `ADMINISTRATOR`');
    antibots[msg.guild.id] = {
      onoff: 'On',
    }
    msg.channel.send(`**✅ The AntiBots Is __𝐎𝐍__ !**`)
    fs.writeFile("./data/antibots.json", JSON.stringify(antibots), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }
}).on('message', msg => {
  if (msg.content.startsWith(prefix + "antibots off")) {
    if (!msg.channel.guild) return msg.reply('**This Command Only For Servers**');
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('**Sorry But You Dont Have Permission** `ADMINISTRATOR`');
    antibots[msg.guild.id] = {
      onoff: 'Off',
    }
    msg.channel.send(`**⛔ The AntiBots Is __𝐎𝐅𝐅__ !**`)
    fs.writeFile("./data/antibots.json", JSON.stringify(antibots), (err) => {
      if (err) console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

}).on("guildMemberAdd", member => {
  if (!antibots[member.guild.id]) antibots[member.guild.id] = {
    onoff: 'Off'
  }
  if (antibots[member.guild.id].onoff === 'Off') return;
  if (member.user.bot) return member.kick()
})
fs.writeFile("./data/antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
    .catch(err => {
      console.error(err);
    });
})
client.on('message', msg => {
  if (msg.content.startsWith(prefix + "antitoken on")) {
    if (!msg.channel.guild) return msg.reply('**This Command Only For Servers**');
    if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`');
    antijoin[msg.guild.id] = {
      onoff: 'On',
    }
    msg.channel.send(`**✅ The AntiJoin Is __𝐎𝐍__ !**`)
    fs.writeFile("./data/token.json", JSON.stringify(antijoin), (err) => {
      if (err) return console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

}).on('message', msg => {
  if (msg.content.startsWith(prefix + "antitoken off")) {
    if (!msg.channel.guild) return msg.reply('**This Command Only For Servers**');
    if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`');
    antijoin[msg.guild.id] = {
      onoff: 'Off',
    }
    msg.channel.send(`**⛔ The AntiJoin Is __𝐎𝐅𝐅__ !**`)
    fs.writeFile("./data/token.json", JSON.stringify(antijoin), (err) => {
      if (err) return console.error(err)
        .catch(err => {
          console.error(err);
        });
    });
  }

}).on('message', msg => {
  if (!msg.channel.guild) return;
  if (msg.content.startsWith(prefix + "setfake")) {
    let time = msg.content.split(" ").slice(1).join(" ");
    if (!msg.channel.guild) return msg.reply('**This Command Only For Servers**');
    if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`');
    if (!time) return msg.channel.send('Please Type The Account Created Time [Days]');
    let embed = new MessageEmbed()
      .setTitle('**Done The AntiJoin Code Has Been Setup**')
      .addField('Account Create Time:', `${time}.`)
      .addField('Requested By:', `${msg.author}`)
      .setThumbnail(msg.author.avatarURL())
      .setFooter(`${client.user.username}`)
    msg.channel.send(embed)
    antijoin[msg.guild.id] = {
      created: time,
      onoff: 'On',
    }
    fs.writeFile("./data/token.json", JSON.stringify(antijoin), (err) => {
      if (err) console.error(err)
    })
  }
}).on("guildMemberAdd", async member => {
  if (!antijoin[member.guild.id]) antijoin[member.guild.id] = {
    onoff: 'Off'
  }
  if (antijoin[member.guild.id].onoff === 'Off') return;
  if (!member.user.bot) return;
  let accounttime = `${antijoin[member.guild.id].created}`
  let moment2 = require('moment-duration-format'),
    moment = require("moment"),
    date = moment.duration(new Date() - member.user.createdAt).format("d");

  if (date < accounttime) {
    member.ban(`Member account age is lower than ${antijoin[member.guild.id].created} days.`)
  }
}).on("message", msg => {
  if (msg.content.startsWith(prefix + "antilink off")) {
    if (!msg.channel.guild)
      return msg.reply("**This Command Only For Servers**");
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return;
    spread[msg.guild.id] = {
      onoff: "Off"
    };
    msg.channel.send(`**⛔ Antilinks __𝐎𝐅𝐅__ !**`);
    fs.writeFile("./data/spread.json", JSON.stringify(spread), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
}).on("message", msg => {
  if (msg.content.startsWith(prefix + "antilink on")) {
    if (!msg.channel.guild)
      return msg.reply("**This Command Only For Servers**");
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return;
    spread[msg.guild.id] = {
      onoff: "On"
    };
    msg.channel.send(`**✅ Antilinks __𝐎𝐍__ !**`);
    fs.writeFile("./data/spread.json", JSON.stringify(spread), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
}).on("message", msg => {
  const muterole = msg.guild.roles.cache.find(r => r.name === "Muted");
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("http://") || msg.content.includes("https://") || msg.content.includes("www")) {
    if (!spread[msg.guild.id])
      spread[msg.guild.id] = {
        onoff: "Off"
      };
    if (spread[msg.guild.id].onoff === "Off") return;
    msg.delete();
    msg.channel.send(`**⛔ Links Isn't Enabled In This Server !**`);
    msg.reply(" Got Muted Role!!")
    msg.member.roles.add(muterole)
  }
}).on("message", msg => {
  if (msg.content.startsWith(prefix + "antiinv off")) {
    if (!msg.channel.guild)
      return msg.reply("**This Command Only For Servers**");
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return;
    discord[msg.guild.id] = {
      onoff: "Off"
    };
    msg.channel.send(`**⛔ AntiDiscordInvites __𝐎𝐅𝐅__ !**`);
    fs.writeFile("./data/discord.json", JSON.stringify(discord), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
}).on("message", msg => {
  if (msg.content.startsWith(prefix + "antiinv on")) {
    if (!msg.channel.guild)
      return msg.reply("**This Command Only For Servers**");
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return;
    discord[msg.guild.id] = {
      onoff: "On"
    };
    msg.channel.send(`**✅ AntiDiscordInvites __𝐎𝐍__ !**`);
    fs.writeFile("./data/discord.json", JSON.stringify(discord), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
}).on("message", msg => {
  const muterole = msg.guild.roles.cache.find(r => r.name === "Muted");
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("discord.gg") || msg.content.includes("DISCORD.GG") || msg.content.includes("بدرو")) {
    if (!discord[msg.guild.id])
      discord[msg.guild.id] = {
        onoff: "Off"
      };
    if (discord[msg.guild.id].onoff === "Off") return;
    msg.delete();
    msg.channel.send(`**⛔ Discord Invites Isn't Enabled is This Server !**`);
    msg.reply(" Got Muted Role!!")
    msg.member.roles.add(muterole)
  }
}).on("message", async msg => {

  if (msg.content.startsWith(prefix + "anitsw off")) {
    if (!msg.channel.guild)
      return msg.reply("**This Command Only For Servers**");
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return msg.channel.send(
        "**ليس لديك صلحيات لأسعمال هذا الامر** `MANAGE_GUILD`"
      );
    swair[msg.guild.id] = {
      onoff: "Off"
    };
    msg.channel.send(`**⛔ تم الغاء التفعيل __𝐎𝐅𝐅__ !**`);
    fs.writeFile("./data/swair.json", JSON.stringify(swair), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
}).on("message", async msg => {
  if (msg.content.startsWith(prefix + "antisw on")) {
    if (!msg.channel.guild)
      return msg.reply("**This Command Only For Servers**");
    if (!msg.member.hasPermission("MANAGE_GUILD"))
      return msg.channel.send(
        "**ليس لديك صلحيات لأستعمال هذا الأمر** `MANAGE_GUILD`"
      );
    swair[msg.guild.id] = {
      onoff: "On"
    };
    msg.channel.send(`**✅ تم التفعيل __𝐎𝐍__ !**`);
    fs.writeFile("./data/swair.json", JSON.stringify(swair), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("شرموط")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("منيوك")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("متناك")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("خول")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("عرص")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("كس")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
}).on("message", msg => {
  var args = msg.content.split(/[ ]+/);
  if (msg.content.includes("احا")) {
    if (!swair[msg.guild.id])
      swair[msg.guild.id] = {
        onoff: "Off"
      };
    if (swair[msg.guild.id].onoff === "Off") return;
    msg.delete();
    return msg.reply(
      `**أحترم نفسك عيب **`
    );
  }
})
const antiSpam = new (require("discord-anti-spam"))({
  warnThreshold: 3,
  kickThreshold: 7,
  banThreshold: 7,
  maxInterval: 2000,
  warnMessage: "{@user}, وقف اسبام.",
  kickMessage: "**{user_tag}** تم طرده بسبب الاسبام.",
  banMessage: "**{user_tag}** تم تبنيده بسبب الاسبام.",
  maxDuplicatesWarning: 7,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  exemptPermissions: [],
  ignoreBots: false,
  verbose: true,
  ignoredUsers: []
});
client.on("message", async message => {
  if (message.author.bot || !message.guild) return;
  if (message.content.toLowerCase() == prefix + "anti-spam") {
    let on_or_off = db.get(message.guild.id);
    message.channel.send(`**Anti Spam is __${on_or_off ? "OFF" : "ON"}__**`);
    db.set(message.guild.id, on_or_off ? false : true);
  }
}).on("message", message => message.guild ? (db.get(message.guild.id) ? antiSpam.message(message) : null) : null);
client.on("message", message => {
    if(!message.channel.guild) return;
    let user = anti[message.guild.id+message.author.id]
    let num = message.content.split(" ").slice(1).join(" ");
    if(!anti[message.guild.id+message.author.id]) anti[message.guild.id+message.author.id] = {
        actions: 0
    }
    if(!config[message.guild.id]) config[message.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
    }
if(message.content.startsWith(prefix + "limit")) {
    if(!message.member.hasPermission('MANAGE_GUILD')) return;
    if(message.content.startsWith(prefix + "limitbans")) {
        if(!num) return message.channel.send("**→ | Supply a number !");
        if(isNaN(num)) return message.channel.send("**→ | Supply a number !**");
        config[message.guild.id].banLimit = num;
        message.channel.send(`**→ | Changed bans limit to : ${config[message.guild.id].banLimit}.**`)
    }
    if(message.content.startsWith(prefix + "limitkicks")) {
        if(!num) return message.channel.send("**→ | Supply a number !**");
        if(isNaN(num)) return message.channel.send("**→ | Supply a number !**"); 
        config[message.guild.id].kickLimits = num;
        message.channel.send(`**→ | Changed kicks limit to : ${config[message.guild.id].kickLimits}.**`)
    }
    if(message.content.startsWith(prefix + "limitroleDelete")) {
        if(!num) return message.channel.send("**→ | Supply a number !**");
        if(isNaN(num)) return message.channel.send("**→ | Supply a number !**");
        config[message.guild.id].roleDelLimit = num;
        message.channel.send(`**→ | Changed Role Deleting limit to : ${config[message.guild.id].roleDelLimit}.**`)
    }
    if(message.content.startsWith(prefix + "limitroleCreate")) {
        if(!num) return message.channel.send("**→ | Supply a number !**");
        if(isNaN(num)) return message.channel.send("**→ | Supply a number !**");
        config[message.guild.id].roleCrLimits = num;
        message.channel.send(`**→ | Changed Role Creation limit to : ${config[message.guild.id].roleCrLimits}.**`)
    }
    if(message.content.startsWith(prefix + "limitchannelDelete")) {
        if(!num) return message.channel.send("**→ | Supply a number !**");
        if(isNaN(num)) return message.channel.send("**→ | Supply a number !**");
        config[message.guild.id].chaDelLimit = num;
        message.channel.send(`**→ | Changed Channel Deleting limit to : ${config[message.guild.id].chaDelLimit}.**`)
    }
    if(message.content.startsWith(prefix + "limittime")) {
        if(!num) return message.channel.send("**→ | Supply a number !**");
        if(isNaN(num)) return message.channel.send("**→ | Supply a number !**");
        config[message.guild.id].time = num;
        message.channel.send(`**→ | Changed Times limit to : ${config[message.guild.id].time}.**`)
    }
    fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function(e) {
        if(e) throw e;
    });
    fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function(e) {
        if(e) throw e;
        });
    }
});
client.on("channelDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
            channel.guild.members.cache.get(entry.id).ban().catch(e => channel.guild.owner.send(`**→ | ${entry.username} , Deleted many __Channles__.**`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
            channel.guild.members.cache.get(entry.id).ban().catch(e => channel.guild.owner.send(`**→ | ${entry.username} , Deleted many __Roles__!**`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
            channel.guild.members.cache.get(entry.id).ban().catch(e => channel.guild.owner.send(`**→ | ${entry.username} , is creating many __Rooms__.**`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});
//admin
client
  .on("message", async msg => {
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    if (command == "clear" || command == "مسح") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      msg.delete({ timeout: 0 })
      if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `MANAGE_GUILD` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      if (!msg.guild.member(client.user).hasPermission('MANAGE_GUILD')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Clear The Cahct In This Server Becuse I Don't Have `MANAGE_GUILD` Permission!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());

      let args = msg.content.split(" ").slice(1)
      let messagecount = parseInt(args);
      if (args > 100) return msg.channel.send(`\`\`\`javascript
    i cant delete more than 100 messages 
    \`\`\``).then(messages => messages.delete(5000))
      if (!messagecount) messagecount = '100';
      msg.channel.messages.fetch({ limit: 100 }).then(messages => msg.channel.bulkDelete(messagecount)).then(msgs => {
        msg.channel.send(`\`\`\`js
    ${msgs.size} messages cleared
    \`\`\``).then(messages =>
          messages.delete({ timeout: 5000 }));
      })
    }
  })
  .on('message', msg => {
    if (msg.content.startsWith(prefix + "ban")) {
      const bans = msg.content.split(" ").slice(2).join(" ")
      if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Bannd Any Member In This Server Becuse I Don't Have `BAN_MEMBERS` Permission!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `BAN_MEMBERS` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      const user = msg.mentions.users.first();
      if (!user) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **Please Mention Same One!**").setFooter(`Request By ${messsage.author.tag}`).setTimestamp());
      if (!bans) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **Please Type Reason!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      msg.guild.member(user).ban(bans, user).then(niro => {
        msg.channel.send("🤔" + " **Processing The Bannd Event...**").then((m) => {
          m.edit("✅" + " **Processing is complete**")
        })
        msg.channel.send(new MessageEmbed().setDescription("✅" + ` **${user} banned from the server ! :airplane: by:<@${msg.author.id}> **`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      })
    }
  })
  .on('message', msg => {
    var user = msg.mentions.users.first() || client.users.cache.get(msg.content.split(' ')[1])
    if (msg.content.startsWith(prefix + 'unban')) {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Bannd Any Member In This Server Becuse I Don't Have `BAN_MEMBERS` Permission!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `BAN_MEMBERS` Permission To Use This Command!**"));
      if (!user) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **Please Type User Id !**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      msg.guild.members.unban(user);
      msg.guild.owner.send("✅" + `This User <@!${user}> Has Ben Unbanned By <@!${msg.author.id}>`)
      msg.channel.send("🤔" + " Processing The Unban Function...").then((m) => {
        m.edit("✅" + " **Processing is complete**")
      })
      msg.channel.send(new MessageEmbed().setDescription("✅" + `This User ${user} Has Ben Unbanned By <@!${msg.author.id}>`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
    }
  })
  .on('message', msg => {
    if (msg.content === prefix + "hide") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.reply(new MessageEmbed().setDescription("❌" + '** You dont have `MANAGE_CHANNELS` permission **').setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      let everyone = msg.guild.roles.cache.find(hyper => hyper.name === '@everyone');
      msg.channel.createOverwrite(everyone, {
        VIEW_CHANNEL: false
      }).then(() => {
        const embed = new MessageEmbed()
          .setDescription("✅" + ` **Done Hide This Room ${msg.channel}**`)
          .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
        msg.channel.send(embed)
      })
    }
  })
  .on("message", (msg) => {
    if (msg.content === prefix + "show") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.reply(new MessageEmbed().setDescription("❌" + '** You dont have `MANAGE_CHANNELS` permission **').setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      let everyone = msg.guild.roles.cache.find(hyper => hyper.name === '@everyone');
      msg.channel.createOverwrite(everyone, {
        VIEW_CHANNEL: true
      }).then(() => {
        const embed = new MessageEmbed()
          .setDescription("✅" + ` **Done Hide This Room ${msg.channel}**`)
          .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
        msg.channel.send(embed)
      })
    }
  })
  .on('message', msg => {
    if (msg.content === prefix + "lock") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `MANAGE_MESSAGES` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      msg.channel.createOverwrite(msg.guild.id, {
        SEND_MESSAGES: false
      }).then(() => {

        msg.reply(new MessageEmbed().setDescription(":lock: **has been locked.**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
        cooldown_command.add(msg.author.id);

      });
    }
    if (msg.content === prefix + "unlock") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `MANAGE_MESSAGES` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      msg.channel.createOverwrite(msg.guild.id, {
        SEND_MESSAGES: true
      }).then(() => {

        msg.reply(new MessageEmbed().setDescription("🔓 **has been unlocked.**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
        cooldown_command.add(msg.author.id);

      });
    }
  })
  .on('message', msg => {
    const millis = require('ms')
    let args = msg.content.split(" ");
    let embed = new MessageEmbed()

      .setDescription("❌" + " **I Can't Kick Any Member In This Server Becuse I Don't Have `MANAGE_ROLES` Permission!**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    let embed2 = new MessageEmbed()

      .setDescription("❌" + " **Please Mention Same One!**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    let embed3 = new MessageEmbed()

      .setDescription("🤔" + " **WTF Are You Doing ??**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    let embed4 = new MessageEmbed()

      .setDescription("🤔" + " **WTF Are You Doing ??**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    let embed5 = new MessageEmbed()

      .setDescription("❌" + " **Soory I Can't Mute Same One High Than Me >_<**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    let embed6 = new MessageEmbed()
      .setDescription("❌" + " **You Need `MANAGE_ROLES` Permission To Use This Command!**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    let embed7 = new MessageEmbed()
      .setDescription("❌" + " **I Can't Find `Muted` Role Type -Create To Create This Role**")
      .setFooter(`Request By ${msg.author.tag}`).setTimestamp()
    if (args[0] === prefix + 'mute') {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(embed6)
      if (!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.channel.send(embed)
      let user = msg.mentions.members.first()
      if (!user) return msg.channel.send(embed2)
      if (user.id === msg.author.id) return msg.reply(embed3)
      if (user.id === client.user.id) return msg.channel.send(embed4)
      if (!msg.guild.member(user).bannable) return msg.reply(embed5)
      let muteRole = msg.guild.roles.cache.find(n => n.name === 'Muted')
      if (!muteRole) return msg.channel.send(embed7)
      user.roles.add(muteRole).catch((err) => {
        let embed8 = new MessageEmbed()
          .setDescription(`**Error**`)
          .setDescription(`Error: ${err.message}`)
          .setTimestamp()
        return msg.channel.send(embed8)
      })
      var time = args[2]
      if (!time) time = '24h'
      msg.channel.send("🤔" + " **Processing The Mute Function**").then((m) => {
        m.edit("✅" + " **Processing is complete**")
      })
      msg.channel.send(new MessageEmbed().setDescription("✅" + ` **${user} Has Ben Muted By <@!${msg.author.id}>**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      setTimeout(() => {
        user.roles.remove(muteRole);
      }, millis(time));
      return;

    }
  }).on('message', msg => {
    if (msg.content === "-Create") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('**You Dont Have** `ADMINISTRATOR` **premission**').then(msg => msg.delete(6000))
      msg.guild.roles.create({ data: { name: Muted, color: "RANDOM" } })
      msg.channel.send("🤔" + " **Processing The CreateRole Function**").then((m) => {
        m.edit("✅" + " **Processing is complete**")
      })
      msg.channel.send(new MessageEmbed().setDescription("Done").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
    }
  })
  .on('message', msg => {
    let args = msg.content.split(" ");
    if (args[0] === prefix + 'unmute') {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `MANAGE_ROLES` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Kick Any Member In This Server Becuse I Don't Have `MANAGE_ROLES` Permission!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      let user = msg.mentions.members.first()
      if (!user) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **Please Mention Same One!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (user.id === msg.author.id) return msg.reply(new MessageEmbed().setDescription("🤔" + " **WTF Are You Doing ??**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      if (!msg.guild.member(user).bannable) return msg.reply(new MessageEmbed().setDescription("❌" + " **I Can't Unmute one high than me >_<**").setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      var muteRole = msg.guild.roles.cache.find(n => n.name === 'Muted')
      if (!muteRole) return msg.channel.send(new MessageEmbed().setDescription("🤔" + ` **WTF Is That ?? [ Super Error ]**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      user.roles.remove(muteRole)
      msg.channel.send("🤔" + " **Processing The Unmute Function**").then((m) => {
        m.edit("✅" + " **Processing is complete**")
      })
      msg.channel.send(new MessageEmbed().setDescription("✅" + ` **${user} Has Ben Unmuted By <@!${msg.author.id}>**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
    }
  })
  .on("message", msg => {
    let roleembed = new MessageEmbed()
      .setDescription(`
                    **Command: role**
                
                    gives roles
                    
                    **Usage:**
                    ${prefix}role (role name)
                    
                    **Example:**
                    ${prefix}role <@!${msg.author.id}> role name
                    ${prefix}role <@!${msg.author.id}> VIP
                    ${prefix}role all role name
                    ${prefix}role all Member
                    ${prefix}role humans role name
                    ${prefix}role humans Human_Role
                    ${prefix}role bots role name
                    ${prefix}role bots Bot_Role
          `)
      .setFooter('Requested by ' + msg.author.username, msg.author.avatarURL())
    var args = msg.content.split(' ').slice(1);
    var msg = msg.content.toLowerCase();
    if (!msg.startsWith(prefix + 'role')) return;
    if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.channel.send(' **__ليس لديك صلاحيات__**');
    if (msg.toLowerCase().startsWith(prefix + 'roleembed')) {
      if (!args[0]) return msg.channel.send(roleembed)
      if (!args[1]) return msg.channel.send(roleembed)
      var role = msg.split(' ').slice(2).join(" ").toLowerCase();
      var role1 = msg.guild.roles.cache.filter(r => r.name.toLowerCase().indexOf(role) > -1).first();
      if (!role1) return msg.reply(roleembed);
      if (msg.mentions.members.first()) {
        msg.mentions.members.first().roles.add(role1);
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] رتبة [ ' + args[0] + ' ] تم اعطاء الى **');
      }
      if (args[0].toLowerCase() == "all") {
        msg.guild.members.cache.forEach(m => m.roles.add(role1))
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] تم اعطاء الى الكل رتبة**');
      } else if (args[0].toLowerCase() == "bots") {
        msg.guild.members.cache.filter(m => m.user.bot).cache.forEach(m => m.roles.add(role1))
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] تم اعطاء الى البوتات رتبة**');
      } else if (args[0].toLowerCase() == "humans") {
        msg.guild.members.cache.filter(m => !m.user.bot).cache.forEach(m => m.roles.add(role1))
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] تم اعطاء الى البشريين رتبة**');
      }
    } else {
      if (!args[0]) return msg.reply(roleembed);
      if (!args[1]) return msg.reply(new Discord.Message().setTitle("❌" + '**:x: يرجى وضع الرتبة المراد اعطائها للشخص**').setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      var role = msg.split(' ').slice(2).join(" ").toLowerCase();
      var role1 = msg.guild.roles.cache.filter(r => r.name.toLowerCase().indexOf(role) > -1).first();
      if (!role1) return msg.reply(new Discord.Message().setTitle("❌" + '** يرجى وضع الرتبة المراد اعطائها للشخص**').setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      if (msg.mentions.members.first()) {
        msg.mentions.members.first().roles.add(role1);
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] رتبة [ ' + args[0] + ' ] تم اعطاء **');
      }
      if (args[0].toLowerCase() == "all") {
        msg.guild.members.cache.forEach(m => m.roles.add(role1))
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] تم اعطاء الكل رتبة**');
      } else if (args[0].toLowerCase() == "bots") {
        msg.guild.members.cache.filter(m => m.user.bot).cache.forEach(m => m.roles.add(role1))
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] تم اعطاء البوتات رتبة**');
      } else if (args[0].toLowerCase() == "humans") {
        msg.guild.members.cache.filter(m => !m.user.bot).cache.forEach(m => m.roles.add(role1))
        return msg.reply('**:white_check_mark: [ ' + role1.name + ' ] تم اعطاء البشريين رتبة**');
      }
    }
  })
  .on('message', msg => {
    if (msg.content.startsWith(prefix + "kick")) {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      const kicks = msg.content.split(" ").slice(2).join(" ")
      if (!msg.guild.me.hasPermission('KICK_MEMBERS')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **I Can't Kick Any Member In This Server Becuse I Don't Have `KICK_MEMBERS` Permission!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **You Need `KICK_MEMBERS` Permission To Use This Command!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());

      const user = msg.mentions.users.first();
      if (!user) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **Please Mention Same One!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      if (!kicks) return msg.channel.send(new MessageEmbed().setDescription("❌" + " **Please Type Reason!**").setFooter(`Request By ${msg.author.tag}`).setTimestamp());
      msg.guild.member(user).kick(kicks, user).then(() => {
        msg.channel.send("🤔" + " **Processing The Kick Function...**").then((m) => {
          m.edit("✅" + " **Processing is complete**")
        })
        msg.channel.send(new MessageEmbed().setDescription("✅" + ` **${user} Has Ben Kicked By <@!${msg.author.id}>**`).setFooter(`Request By ${msg.author.tag}`).setTimestamp())
      })
    }
  })
  .on('message', msg => {
    if (msg.content.startsWith(prefix + "showbans")) {
      if (!msg.channel.guild) return;
      msg.channel
      msg.guild.fetchBans()
        .then(bans => msg.channel.send(`:small_orange_diamond: **Server Ban List :** ${bans.size} `))
        .catch(console.error);
    }
  });
//public
client
  .on("message", async msg => {
    if (msg.content.startsWith(prefix + "link")) {
      if (msg.author.bot) return;
      if (!msg.guild) return msg.channel.send(new MessageEmbed().setDescription("❌" + ` **You Can't Use Commands In Dm's!**`));
      msg.channel.send(new MessageEmbed().setColor("BLUE").setImage('https://media.discordapp.net/attachments/645576197987631116/754832580209279096/ProProtection_QR_Code.png?width=492&height=584').setDescription(`**
            Bot Link: [Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
            **`))
    }
  })
  .on('message', msg => {
    if (msg.content.startsWith(prefix + "id")) {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`request BY ${msg.author.tag}`).setTimestamp())

      var args = msg.content.split(" ").slice(1);
      let user = msg.mentions.users.first();
      var men = msg.mentions.users.first();
      var heg;
      if (men) {
        heg = men
      } else {
        heg = msg.author
      }
      var mentionned = msg.mentions.members.first();
      var h;
      if (mentionned) {
        h = mentionned
      } else {
        h = msg.member
      }
      moment.locale('ar-TN');
      let id = new MessageEmbed().setColor("BLUE")
        .setDescription(`**❯ Name : 
                ${msg.author.username}

                ❯ ID :
                ${msg.author.id}

                ❯ Created At :
                ${moment(heg.createdTimestamp).format('YYYY/M/D')} 
                **`)
        .setThumbnail(heg.avatarURL({
          dynamic: true,
          format: 'png',
          size: 1024,
        }));
      msg.channel.send(id)
    }
  })
  .on("message", async msg => {
    let command = msg.content.toLowerCase().split(" ")[0]
    command = command.slice(prefix.length)
    if (command == "avatar") {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("BLUE").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`request BY ${msg.author.tag}`).setTimestamp())

      let args = msg.content.split(" ")
      let user = msg.mentions.users.first() || msg.author || msg.guild.member.cache.get(args[1])
      msg.channel.send(new MessageEmbed()
        .setAuthor(user.tag)
        .setDescription(`**[Avatar Link](${user.avatarURL()})**`)
        .setImage(user.avatarURL({
          dynamic: true,
          format: 'png',
          size: 1024
        }))
      );
    }
  })
  .on('message', msg => {
    if (msg.content === (prefix + 'ping')) {
      if (msg.author.bot) return;
      if (msg.channel.type == "dm") return msg.channel.send(new MessageEmbed().setColor("RED").setDescription("❌" + ` **You Can't Use This Command In DM's!**`).setFooter(`request BY ${msg.author.tag}`).setTimestamp())
      var start = Date.now();
      msg.channel.send('NIR0 IS HERE').then(msg => {
        msg.edit(`\`\`\`js
Time taken: ${Date.now() - start} ms
Discord API: ${client.ws.ping.toFixed(0)} ms\`\`\``);
      });
    }
  })
  .on("message", msg => {
    if (msg.content.startsWith(prefix + "user")) {
      msg.delete()
    }
  })
  .on(`message`, msg => {
    if (msg.content.startsWith(prefix + "server")) {
      if (!msg.channel.guild) return msg.channel.send('This is for servers only');

      const text = msg.guild.channels.cache.filter(r => r.type === "text").size
      const voice = msg.guild.channels.cache.filter(r => r.type === "voice").size
      const chs = msg.guild.channels.cache.size
      const avaibles = msg.guild.features.map(features => features.toString()).join("\n")

      const roles = msg.guild.roles.cache.size

      const online = msg.guild.members.cache.filter(m =>
        m.presence.status === 'online'
      ).size

      const idle = msg.guild.members.cache.filter(m =>
        m.presence.status === 'idle'
      ).size

      const offline = msg.guild.members.cache.filter(m =>
        m.presence.status === 'offline'
      ).size

      const dnd = msg.guild.members.cache.filter(m =>
        m.presence.status === 'dnd'
      ).size

      const black = new MessageEmbed()
        .setTitle('Naar Codes')
        .setColor('BLACK')
        .addFields({
          name: `🆔 Server ID`,
          value: `${msg.guild.id}`,
          inline: true

        }, {
            name: `📆 Created On`,
            value: msg.guild.createdAt.toLocaleString(),
            inline: true
          }, {
            name: `👑 Owner By`,
            value: `${msg.guild.owner}`,
            inline: true

          }, {
            name: `👥 Members (${msg.guild.memberCount})`,
            value: `**${online}** Online \n **${msg.guild.premiumSubscriptionCount}** Boosts ✨`,
            inline: true
          }, {
            name: `💬 Channels (${chs})`,
            value: `**${text}** Text | **${voice}** Voice`,
            inline: true
          }, {
            name: `🌍 Others`,
            value: `**Region:** ${msg.guild.region}\n**Verification Level:** ${msg.guild.verificationLevel}`,
            inline: true
          }, {
            name: `🔐 Roles (${roles})`,
            value: `To see a list with all roles use #roles`,
            inline: true
          })
        .setFooter(`Requested By : ${msg.author.tag}`)
      msg.channel.send(black)
    }
  });