const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Help extends Command {

    constructor (client) {
        super(client, {
            
            name: "help",
           
            enabled: true,
            
            description: (language) => language.get("HELP_DESCRIPTION"),
            usage: (language) => language.get("HELP_USAGE"),
            examples: (language) => language.get("HELP_EXAMPLES"),
            
            aliases: [ "h" ],
            
            clientPermissions: [ "EMBED_LINKS" ],
            
            permLevel: 0,
      
            cooldown: 1000,
            
            commandPath: __dirname,
            
            guildOnly: false,
            
            nsfw: false
        });
    }

    async run (message, args, data) {

        if(args[0]){

           
            let cmd = this.client.commands.get(args[0]) || this.client.commands.get(message.client.aliases.get(args[0]));
            if(!cmd) return message.channel.send(message.language.get("HELP_CMD_NOT_FOUND", args[0]));

           
            let examples = cmd.help.examples(message.language).replace(/[$_]/g, data.guildConf.prefix);


            let groupEmbed = new Discord.MessageEmbed()
                .setAuthor(message.language.get("HELP_HEADINGS")[0]+" "+cmd.help.name)
                .addField(message.language.get("HELP_HEADINGS")[1], data.guildConf.prefix+cmd.help.usage(message.language), true)
                .addField(message.language.get("HELP_HEADINGS")[2], examples, true)
                .addField(message.language.get("HELP_HEADINGS")[3], cmd.help.category, true)
                .addField(message.language.get("HELP_HEADINGS")[4], cmd.help.description(message.language), true)
                .addField(message.language.get("HELP_HEADINGS")[5], (cmd.conf.aliases.length > 0) ? cmd.conf.aliases.map((a) => "`"+a+"`").join("\n") : message.language.get("HELP_NO_ALIASES"), true)
                .addField(message.language.get("HELP_HEADINGS")[6], message.language.get("PERM_LEVELS")[cmd.conf.permLevel], true)
                .setColor(data.config.embed.color)
                .setFooter(data.config.embed.footer);


            return message.channel.send(groupEmbed);
        }


        const categories = [];
        this.client.commands.forEach((cmd) => {
            if(!categories.includes(cmd.help.category)){
                categories.push(cmd.help.category);
            }
        });

        let embed = new Discord.MessageEmbed()
        .setAuthor(this.client.user.username+" | "+message.language.get("HELP_TITLE"))
        .setDescription(message.language.get("HELP_SUBTITLE", data.guildConf.prefix))
        .setColor(data.config.embed.color)
        .setFooter(data.config.embed.footer);

    
        categories.sort().forEach((cat) => {
            let commandsCategory = this.client.commands.filter((cmd) => cmd.help.category === cat);
            embed.addField(cat+" - ("+commandsCategory.size+")", commandsCategory.map((cmd) => "`"+cmd.help.name+"`").join(", "));
        });
        
        message.channel.send(embed);
    }

}

module.exports = Help;