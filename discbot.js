const util = require("util"),
fs = require("fs"),
mongoose = require("mongoose"),
readdir = util.promisify(fs.readdir),
permissions = require("./helpers/permissions");


const Client = require("./structures/Client"),
client = new Client();

const init = async () => {

    
    let categories = await readdir("./commands/");
    client.logger.log(`Chargement d'un total de ${categories.length} catégories.`, "log");
    categories.forEach(async (cat) => {
        let commands = await readdir(`./commands/${cat}/`);
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand(`./commands/${cat}`, cmd);
            if(response) client.logger.log(response, "error");
        });
    });

    
    const evtFiles = await readdir("./events/");
    client.logger.log(`Chargement d'un total de ${evtFiles.length} événements.`, "log");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        client.logger.log(`Chargement Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    
    
    mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        client.logger.log("Connecté à la base de données Mongodb.", "log");
    }).catch((err) => {
        client.logger.log("Impossible de se connecter à la base de données Mongodb. Error:"+err, "error");
    });

    client.login(client.config.token); 

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Le bot se déconnecte...", "warn"))
    .on("reconnecting", () => client.logger.log("Reconnexion du bot...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    client.logger.log("Erreur non interceptée: "+err, "error");
});