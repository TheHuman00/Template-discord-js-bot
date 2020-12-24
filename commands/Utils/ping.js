const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Ping extends Command {

    constructor (client) {
        super(client, {
            
            name: "ping",
            
            enabled: true,
            
            description: (language) => language.get("PING_DESCRIPTION"),
            usage: (language) => language.get("PING_USAGE"),
            examples: (language) => language.get("PING_EXAMPLES"),
            
            aliases: [ "pong", "latency" ],
            
            clientPermissions: [],
            
            permLevel: 0,
            
            cooldown: 1000,
            
            commandPath: __dirname,
           
            guildOnly: false,
            
            nsfw: false
        });
    }

    async run (message, args, data) {
        let m = await message.channel.send(message.language.get("PING_WAIT"));
        m.edit(message.language.get("PING_RESULT", m.createdTimestamp - message.createdTimestamp));
    }

}

module.exports = Ping;