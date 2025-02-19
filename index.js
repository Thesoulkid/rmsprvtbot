const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const { menu, ping, hyjackGC } = require("./soulzinmaker");
const { delay } = require("./src/utils");

async function connectBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, 
    });

    sock.ev.on("creds.update", saveCreds);
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(`Connection closed: ${reason}`);
            connectBot();
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        const msg = m.message.conversation || m.message.extendedTextMessage?.text;

        if (msg === ".menu") await menu(sock, m);
        if (msg === ".ping") await ping(sock, m);
        if (msg === ".hyjack_gc") await hyjackGC(sock, m);
    });
}

connectBot();
