const command = require('yargs').argv._[0];

const COMMANDS = require('./src/constants.js').COMMANDS;
const notes = require('./src/notes.js');

const operateWithNotes = {
  [COMMANDS.ADD]: notes.addNote,
  [COMMANDS.LIST]: notes.getAll,
  [COMMANDS.READ]: notes.getNote,
  [COMMANDS.REMOVE]: notes.removeNote,
}[command] || null;

if (operateWithNotes) {
  operateWithNotes();
}
