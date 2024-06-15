const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
const TOKEN = '';
let { sifrelerSet1, verilecek_rol_set1, sifrelerSet2, verilecek_rol_set2, sunucu_id } = require('./sifreler.json');

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} kullanıcı adıyla aktif!`);
});

client.on('message', async message => {
    if (message.author.bot) return; // Botlardan gelen mesajları yok say

    // Özel mesajlardan gelen mesajları işle
    if (message.channel.type === 'dm') {
        const content = message.content.trim();
        
        // Şifre set 1 için işlem
        if (sifrelerSet1.includes(content)) {
            try {
                // Belirli bir sunucudaki belirli bir kullanıcıya role verme işlemi
                const guild = client.guilds.cache.get(sunucu_id);
                const member = await guild.members.fetch(message.author.id);
                const role = guild.roles.cache.get(verilecek_rol_set1);
                
                await member.roles.add(role);
                message.reply(`Merhabalar! ${role.name} rolünü başarıyla aldınız.`);

                // Kullanılan şifreyi sifrelerSet1'den sil
                sifrelerSet1 = sifrelerSet1.filter(sifre => sifre !== content);
                updateSifrelerJson(); // sifreler.json dosyasını güncelle
            } catch (err) {
                console.error('Rol verme işlemi sırasında hata oluştu:', err);
                message.reply('Rol verme işlemi sırasında bir hata oluştu.');
            }
        }

        // Şifre set 2 için işlem
        else if (sifrelerSet2.includes(content)) {
            try {
                // Belirli bir sunucudaki belirli bir kullanıcıya role verme işlemi
                const guild = client.guilds.cache.get(sunucu_id);
                const member = await guild.members.fetch(message.author.id);
                const role = guild.roles.cache.get(verilecek_rol_set2);
                
                await member.roles.add(role);
                message.reply(`Merhabalar! ${role.name} rolünü başarıyla aldınız.`);

                // Kullanılan şifreyi sifrelerSet2'den sil
                sifrelerSet2 = sifrelerSet2.filter(sifre => sifre !== content);
                updateSifrelerJson(); // sifreler.json dosyasını güncelle
            } catch (err) {
                console.error('Rol verme işlemi sırasında hata oluştu:', err);
                message.reply('Rol verme işlemi sırasında bir hata oluştu.');
            }
        } else {
            // Yanlış şifre girildiğinde kullanıcıya mesaj gönder
            message.reply('KOD YANLIŞ ❌');
        }
    }
});

function updateSifrelerJson() {
    const newData = {
        sifrelerSet1: sifrelerSet1,
        verilecek_rol_set1: verilecek_rol_set1,
        sifrelerSet2: sifrelerSet2,
        verilecek_rol_set2: verilecek_rol_set2,
        sunucu_id: sunucu_id
    };

    fs.writeFile('./sifreler.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('sifreler.json dosyası güncellenirken hata oluştu:', err);
        } else {
            console.log('sifreler.json dosyası başarıyla güncellendi.');
        }
    });
}

client.login(TOKEN);
