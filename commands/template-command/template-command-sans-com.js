const Command = require("../../structures/Command.js"),
Discord = require("discord.js");


class Avatar extends Command {
	constructor (client) { 
		super(client, {
            name: "avatar",
            enabled: true, 
            
            description: (language) => language.get("AVATAR_DESCRIPTION"), 
            usage: (language) => language.get("AVATAR_USAGE"),          
            examples: (language) => language.get("AVATAR_EXAMPLES"),   
            
            aliases: [ "pdp", "photo" ], 
            clientPermissions: [ "EMBED_LINKS" ], 
            permLevel: 0, 
            cooldown: 1000, 
            commandPath: __dirname, 
            guildOnly: false,  
            nsfw: false 
		});
	}

    async run (message, args) {                                  
                                                                           
		let user = await this.client.resolveUser(args[0]);
		if(!user) user = message.author;
		const avatarURL = user.displayAvatarURL({ size: 512, dynamic: true }).replace(".webp", ".png");
		if(message.content.includes("-v")) message.channel.send("<"+avatarURL+">");
		const attachment = new Discord.MessageAttachment(avatarURL, `avatar.${avatarURL.split(".").pop().split("?")[0]}`);
		message.channel.send(attachment);

	}

}

module.exports = Avatar;    // cela permet d'exporter votre commande (permettre au autre fonction de pouvoir lire celle-ci)