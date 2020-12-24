const Command = require("../../structures/Command.js"),
Discord = require("discord.js"),
json = require("json-beautify"),
fs = require("fs"),
emojis = fs.readdirSync("./assets/img/emojis").map((e) => e.split("."));

const asyncForEach = async (array, callback) => {
    const results = [];
    for (let index = 0; index < array.length; index++) {
        let result = await callback(array[index], index, array);
        results.push(result);
    }
    return results;
}

const addEmojis = async (guild) => {
    return await asyncForEach(emojis, async (emojiData) => {
        return await guild.emojis.create(`./assets/img/emojis/${emojiData[0]}.${emojiData[1]}`, emojiData[0]);
    });
}

class BuildEmojis extends Command {

    constructor (client) {
        super(client, {
            
            name: "build-emojis",
            
            enabled: true,
            
            description: (language) => language.get("BUILD_EMOJIS_DESCRIPTION"),
            usage: (language) => language.get("BUILD_EMOJIS_USAGE"),
            examples: (language) => language.get("BUILD_EMOJIS_EXAMPLES"),
            
            aliases: [],
            
            clientPermissions: [ "MANAGE_EMOJIS" ],
            
            permLevel: 4,
            
            cooldown: 5000,
            
            commandPath: __dirname,
            
            guildOnly: true,
            
            nsfw: false
        });
    }

    async run (message, args, data) {
        let m = await message.channel.send(message.language.get("BUILD_EMOJIS_IN_PROGRESS"));
        let emojis = await addEmojis(message.guild);
        let toDisplay = {};
        emojis.forEach((e) => toDisplay[e.name] = e.toString());
        m.edit(message.language.get("BUILD_EMOJIS_INFOS")+"\n```Json\n"+json(toDisplay, null, 4, 100)+"```");
    }

}

module.exports = BuildEmojis;