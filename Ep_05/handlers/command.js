// const { readdirSync } = require("fs");

// module.exports = (client) => {
//     readdirSync("./commands/").forEach(dir => {
//         const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
//         for (let file of commands) {
//             let pull = require(`../commands/${dir}/${file}`);

//             if (typeof(pull.name) === "string") {
//                 client.commands.set(pull.name, pull);
//             } else if (Array.isArray(pull.name) && pull.name.length > 1) {
//                 if (pull.name.length > 1) {
//                     pull.aliases = pull.name.slice(1);
//                     pull.name = pull.name[0]
    
//                     client.commands.set(pull.name, pull);
//                 } else {
//                     client.commands.set(pull.name[0], pull);
//                 } 
//             }
//         }
//     });
// }

// let command = client.commands.get(cmd);;
//     if (!command) command = client.commands.find(c => c.name.includes(cmd));

//     if (command) 
//         command.run(client, message, args);

const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    
    console.log(table.toString());
}