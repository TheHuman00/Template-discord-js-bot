module.exports = {
    // le token de votre bot se trouve ici https://discord.com/developers/applications dans application < bot < token copy
    token: "Discord Bot Token",

    guildConf: {
        language: "french", // quelle fichier de langue sera utilisé dans le dossier ../languages/french
        prefix: "/" // le prefix utilisé dans votre bot
    },
    
    
    mongoDB: "", // url de votre base de donnée

    emojis: {
        success: "XXXXXXXXX", // id de votre émoji 
        error: "XXXXXXXXX", // id de votre émoji 
        loading: "XXXXXXXXX" // id de votre émoji 
    },

    owners: [], // id du ou des propio du bot 

    embed: {
        color: "#FF0000", // couleur des messages embed
        footer: "Discbot"  // bas de page des messages embed
    },

    status: { // statut de votre bot
        updateEvery: 20000,   // taux de rafréchissement (milliseconde)
        list: [
            {
                type: "PLAYING", // PLAYING LISTENING STREAMING
                content: "{guildsCount} serveurs!" // description de votre statut
            },
            {
                type: "LISTENING", // PLAYING LISTENING STREAMING
                content: "{usersCount} utilisateurs" // description de votre statut
            }
        ]
    }

};