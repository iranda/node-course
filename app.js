const command = require('yargs').argv._[0];

const COMMANDS = require('./constants.js').COMMANDS;
const notes = require('./src/notes.js');

const operateWithNotes = (operation) => {
  const command = {
    [COMMANDS.ADD]: notes.addNote,
    [COMMANDS.LIST]: notes.getAll,
    [COMMANDS.READ]: notes.getNote,
    [COMMANDS.REMOVE]: notes.removeNote,
  }[operation];

  return command ? command() : null;
};

operateWithNotes(command);

module.exports = {
  operateWithNotes,
};
