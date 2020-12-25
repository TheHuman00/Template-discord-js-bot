# Template Discord.js Bot avec base de donnée MongoDB

Voici une template pour bot discord en discord.js. Avec base de donnée, et plusieurs language disponible, ...

## Installation

Si cela n'est pas encore fait, installer [npm](https://nodejs.org/fr/). *(De préférence la version LTS)*

Ensuite faites cette commande de le terminal de votre dossier ou vous avez mis le template :

```javascript
npm install
```
(Vous ne savez pas comment ouvrir le terminal d'un dossier rendez vous [ici](https://github.com/TheHuman00/Template-discord-js-bot/blob/master/TERMINAL.md))

Vous devrez ensuite configurer votre fichier `config.js` ce trouvant à la racine
- Vous devrez y inscrire votre **token**. ([Rubrique associé](https://github.com/TheHuman00/Template-discord-js-bot#comment-avoir-votre-token-discord-))
- Ensuite y inscrire votre **lien mongoDB**. ([Rubrique associé](https://github.com/TheHuman00/Template-discord-js-bot#comment-avoir-votre-lien-mongodb-))

## Comment avoir votre Token discord ?

- Rendez vous sur le [panneau développeur de discord](https://discord.com/developers/applications).
- Allez dans **application** et selectionné la votre, ou créer en une.
- Ensuite rendez vous dans l'onglet **Bot** et copier votre token.
- (N'oubliez pas de cocher les deux case sous **Privileged Gateway Intents** !)
**Ce token est priver, ne le partagé à personne d'autre que vous !**

## Comment avoir votre lien mongoDB ?

- Rendez vous sur le [site de mongo](https://www.mongodb.com/cloud/atlas) et créer un compte gratuitement.
- Créer un nouveau cluster gratuit *(la création peut prendre plusieurs minute)*.
- Cliquer sur **Connect to cluster** ensuite **Connect using MongoDB Compass**.
- Copier l'url et remplacer *test* en fin de ligne par le nom que vous voulez donnez à votre base de donnée exemple *discordbot*.
**Ce token est priver, ne le partagé à personne d'autre que vous !**

## Comment créer une nouvelle commande ?

Suivez l'exemple qui se trouve dans le dossier **template**.
Dans celui ci vous trouverez deux fichier : 
- `template-command` : fichier exemple avec des commentaires explicatifs.
- `template-command-sans-com` : fichier exemple sans les commentaires.

Lorsque vous aurez fait votre commande insérer la dans le dossier commands < puis le dossier dans le quelle vous voulez le classez __exemple :__ *commands < musique*.

## Comment créer un nouveau event ?

Suivez l'exemple qui se trouve dans le dossier **template**.
- `template-events` : Remplacer le nom du fichier par le nom de l'événement et mettez le dans le dossier events.

## Comment inviter le bot sur votre serveur ?

- Allez sur la [page dévelopeur de discord et selectionner votre application](https://discord.com/developers/applications).
- Dans l'onglet **Bot**, scroller vers **Bot Permissions** cocher les permissions nécessaire du bot (Cocher simplement administrateur si vous voulez que votre bot posséde toute les permissions).
- Copiez le lien généré juste en dessus.
*Ce lien est publique, vous pouvez donc le partagé à n'importe qui*.


## Support / Besoin d'aide ?
Les pull requests sont les bienvenues. Créer un issue ou rejoigner le [serveur discord](https://discord.gg/QU5mKFC)

## Crédit
[Androz2091](https://github.com/Androz2091/)