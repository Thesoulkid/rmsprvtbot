const { delay } = require("./src/utils");

async function menu(sock, m) {
    let chat = m.key.remoteJid;
    
    let msg = await sock.sendMessage(chat, { text: "H" });
    await delay(1000);
    await sock.sendMessage(chat, { edit: msg.key, text: "Hi" });
    await delay(1000);
    await sock.sendMessage(chat, { edit: msg.key, text: Hey @${m.key.participant.split("@")[0]}, I am Soul's Private Bot made by SoulZinMaker 🗣️, mentions: [m.key.participant] });
    await delay(1000);
    await sock.sendMessage(chat, { edit: msg.key, text: "🔥 Satanic SoulBot Features 🔥\n\n.menu - Show menu\n.ping - Check bot speed\n.hyjack_gc - Hijack group" });
}

async function ping(sock, m) {
    let start = Date.now();
    await sock.sendMessage(m.key.remoteJid, { text: "Pong!" });
    let end = Date.now();
    await sock.sendMessage(m.key.remoteJid, { text: Speed: ${end - start}ms });
}

async function hyjackGC(sock, m) {
    let chat = m.key.remoteJid;
    let groupMetadata = await sock.groupMetadata(chat);
    let participant = m.key.participant;
    
    if (groupMetadata.participants.some(p => p.id === participant && p.admin)) {
        await sock.groupUpdateSubject(chat, "Hyjacked By SoulZinMaker");
        await sock.groupUpdateDescription(chat, "Hahaha Have Some Fun 🤩");
        await sock.groupUpdatePicture(chat, { url: "https://your-image-url.jpg" });
    } else {
        await sock.sendMessage(chat, { text: "Sry Boss, Ni ee Grp ill Admin Alla 🥲🫳🏻" });
    }
}

module.exports = { menu, ping, hyjackGC };
