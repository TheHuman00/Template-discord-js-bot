const config = require("../config");

module.exports = [
    {
        level: 0, // niveau everyone
        check: () => true,
    },
    {
        level: 1, // peut gérer les messages
        check: (message) => (message.guild ? message.member.hasPermission("MANAGE_MESSAGES") : false),
    },
    {
        level: 2, // est administrateur du serveur
        check: (message) => (message.guild ? message.member.hasPermission("ADMINISTRATOR") : false),
    },
    {
        level: 3,  // est fondateur du serveur
        check: (message) => (message.guild ? message.author.id === message.guild.ownerID : false),
    },
    {
        level: 4,  // est proprio du bot définit dans le fichier config.js
        check: (message) => config.owners.some((o) => o === message.author.id),
    },
];