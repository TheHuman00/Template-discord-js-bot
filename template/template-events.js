// N'OUBLIEZ PAS DE NOMER LE FICHIER PAR LE NOM DE L'EVENEMENT QUE VOUS VOULEZ AVOIR 
// Tout les noms d'évenement son disponible ici : https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate
// exemple l'événement lorsque quelqu'un rejoint le serveur serai : guildMemberAdd


const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        //ici ce que vous voulez faire lorsque l'event est déclenché

    }
}  