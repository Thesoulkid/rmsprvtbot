module.exports = {
    async typingAnimation(sock, chat) {
        await sock.sendPresenceUpdate("composing", chat);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await sock.sendPresenceUpdate("paused", chat);
    },
};
