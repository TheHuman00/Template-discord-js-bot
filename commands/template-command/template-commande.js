//////////////////////////////////////////////////////////////////////
// Ici toutes les constantes qui seront appelées dans votre function

const Command = require("../../structures/Command.js"),
Discord = require("discord.js");


class Avatar extends Command { //le nom de votre commande (!! avec une majuscule !!)
	constructor (client) { // toutes les informations meta de votre commande
		super(client, {
            name: "avatar", // le nom de votre commande
            enabled: true, // si votre commande est activée ou désactivée <true> ou <false>
            
            description: (language) => language.get("AVATAR_DESCRIPTION"),  // ceci sera la description dans      // 
            usage: (language) => language.get("AVATAR_USAGE"),              // votre commande /help              // // Ce référer au fichier ../../languages/french.js ligne 61
            examples: (language) => language.get("AVATAR_EXAMPLES"),        //                                     //
            
            aliases: [ "pdp", "photo" ], // manière différente d'invoquer la commande
            clientPermissions: [ "EMBED_LINKS" ], // la permission qu'aura besoin la personne qui écrit la commande
            permLevel: 0, // le niveau de permission qu'à besoin l'utilisateur  
            cooldown: 1000, // 
            commandPath: __dirname, // constante qui définit dans quelle dossier se trouve la commande
            guildOnly: false,  // <true> la commande ne peut que être exécuté dans un serveur  //// <false> la commande marche aussi en MP du bot
            nsfw: false // la commande est NSFW et ne peux que marché dans un channel définit comme tel
		});
	}

    async run (message, args) {                                             // ici le coeur de votre commande
                                                                            // c'est ce qu'il va se passer lorsque quelqu'un enverra votre commande ou son alias 
		let user = await this.client.resolveUser(args[0]);
		if(!user) user = message.author;
		const avatarURL = user.displayAvatarURL({ size: 512, dynamic: true }).replace(".webp", ".png");
		if(message.content.includes("-v")) message.channel.send("<"+avatarURL+">");
		const attachment = new Discord.MessageAttachment(avatarURL, `avatar.${avatarURL.split(".").pop().split("?")[0]}`);
		message.channel.send(attachment);

	}

}

module.exports = Avatar;    // cela permet d'exporter votre commande (permettre au autre fonction de pouvoir lire celle-ci)