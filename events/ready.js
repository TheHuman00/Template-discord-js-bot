const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        let client = this.client;

        
        client.logger.log(`Chargement d'un total de ${client.commands.size} command(s).`, "log");
        client.logger.log(`${client.user.tag}, Prêt à servir ${client.users.size} utilisateurs dans ${client.guilds.size} serveurs.`, "ready");

        

        const statusList = require("../config.js").status.list || [],
        version = require("../package.json").version;
        let i = 0;
        setInterval(() => {

            let status = statusList[parseInt(i, 10)];
            
            let statusContent = status.content
            .replace(/{usersCount}/g, client.users.size)
            .replace(/{guildsCount}/g, client.guilds.size);
    
            client.user.setActivity(statusContent, { type: status.type });
    
            if(statusList[parseInt(i+1, 10)]) i++
            else i = 0;

        }, require("../config.js").status.updateEvery);

    }
}  