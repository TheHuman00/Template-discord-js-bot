const Discord = require("discord.js");

module.exports = class {

	constructor (client) {
		this.client = client;
	}
    
	async run (guild) {
        
		guild = await guild.fetch();

		const messageOptions = {};


		const thanksEmbed = new Discord.MessageEmbed()
			.setAuthor("Merci de m'avoir ajouté sur votre serveur ! / ")
			.setDescription("/help pour voir les commandes disponible")
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer)
			.setTimestamp();
		messageOptions.embed = thanksEmbed;

		guild.owner.send(messageOptions).catch(() => {});
        
	}
};  