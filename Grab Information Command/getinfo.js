exports.run = (client, message, args) => {
 const rbx = require('noblox.js');

  let username = args[0];
  if (!username)
    return message.channel.send({
      embed: {
        description:
          `You did not provide the \`username\` argument.\n` +
          `\n` +
          `Usage: ${config.prefix}getinfo <username>`,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL
        },
        color: 16733013
      }
    });

  rbx
    .getIdFromUsername(username)
    .then(function(id) {
      rbx.getRankNameInGroup(config.groupId, id).then(function(rank) {
        rbx.getRankInGroup(config.groupId, id).then(function(ranknumber) {
          let ranknumberset = ranknumber;
          let rankname = rank;
          message.channel.send(`${username}:${id}`);
          message.channel.send({
            embed: {
              description: `[Profile Link](https://www.roblox.com/users/${id}/profile)`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL
              },
              color: 9240450,
              fields: [
                {
                  name: `Username`,
                  value: username,
                  inline: false
                },
                {
                  name: `ID`,
                  value: id,
                  inline: false
                },
                {
                  name: `Group Rank`,
                  value: `${rankname} **(${ranknumberset})**`,
                  inline: false
                }
              ],
              thumbnail: {
                url: `https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
              }
            }
          });
        });
      });
    })
    .catch(function(err) {
      return message.channel.send({
        embed: {
          description:
            `I couldn't find that user!` + `\n` + `You provided: ${username}`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL
          },
          color: 16733013
        }
      });
    });
};
