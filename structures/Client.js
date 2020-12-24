const { Client, Collection } = require("discord.js"),
util = require("util"),
path = require("path");


class Discordjss extends Client {

    constructor (options) {
        super(options);
        this.config = require("../config");
        this.commands = new Collection();
        this.aliases = new Collection(); 
        this.logger = require("../helpers/logger"); 
        this.wait = util.promisify(setTimeout); 
        this.guildsData = require("./Guild"); 
        this.permissions = require("../helpers/permissions"); 
    }

    // Cette fonction permet de charger une commande et de l'ajouter à la collection
    loadCommand(commandPath, commandName){
        try {
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Chargement de Commande: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if(props.init) props.init(this);
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Impossible de charger la commande ${commandName}: ${e}`;
        }
    }

    // Cette fonction est utilisée pour charger une commande (vous devez les charger à nouveau)
    async unloadCommand (commandPath, commandName) {
        let command;
        if(this.commands.has(commandName)) command = this.commands.get(commandName);
        else if(this.aliases.has(commandName)) command = this.commands.get(this.aliases.get(commandName));
        if(!command) return `La commande \`${commandName}\` ne semble pas exister, ni n'est-ce un alias. Réessayer!`;
        if(command.shutdown) await command.shutdown(this);
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    // This function is used to find a guild data or create it
    async findOrCreateGuild(param, isLean){
        let guildsData = this.guildsData;
        return new Promise(async function (resolve, reject){
            let guildData = (isLean ? await guildsData.findOne(param).lean() : await guildsData.findOne(param));
            if(guildData){
                resolve(guildData);
            } else {
                guildData = new guildsData(param);
                await guildData.save();
                resolve(guildData.toJSON());
            }
        });
    }

    getLevel(message) {
		let permlvl = 0;
		const permOrder = this.permissions.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
		while (permOrder.length) {
			const currentLevel = permOrder.shift();
			if(message.guild && currentLevel.guildOnly) continue;
			if(currentLevel.check(message)) {
				permlvl = currentLevel.level;
				break;
			}
		}
		return permlvl;
    }

}

module.exports = Discordjss;