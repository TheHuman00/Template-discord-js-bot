const path = require("path");

module.exports = class Command {
    constructor(client, {
        
        name = null,
        
        enabled = true,
        
        description = (language) => language.get("NO_DESCRIPTION_PROVIDED"),
        usage = (language) => language.get("NO_USAGE_PROVIDED"),
        examples = (language) => language.get("NO_EXAMPLES_PROVIDED"),
        
        aliases = new Array(),
        
        clientPermissions = new Array(),
        
        permLevel = 0,
        
        cooldown = 5000,
        
        commandPath = null,
        
        guildOnly = false,
        
        nsfw = false
    })
    {
        let category = (commandPath ? commandPath.split(path.sep)[parseInt(commandPath.split(path.sep).length-1, 10)] : "Other");
        this.client = client;
        this.conf = { enabled, aliases, permLevel, clientPermissions, cooldown, guildOnly, nsfw };
        this.help = { name, description, usage, examples, category };
    }
};