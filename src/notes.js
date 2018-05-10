const fs = require('fs');
const FileName = require('../constants.js').FILE_NAME;

var getNotesFromFile = (fileName) => {
  try {
    return JSON.parse(fs.readFileSync(FileName));
  } catch (err) {
    return [];
  }
};

var saveNotesToFile = (fileName, noteJson) => {
  fs.writeFile(fileName, JSON.stringify(noteJson));
};

var addNote = (title, body) => {
  const note = {
    title,
    body
  };
  const notes = getNotesFromFile(FileName);
  notes.push(note);
  saveNotesToFile(FileName, notes);
};

var removeNote = (title) => {
  const notes = getNotesFromFile(FileName)
    .filter(note => note.title !== title);
  saveNotesToFile(FileName, notes);
};

var getNote = () => {
  console.log('getNote is executed');
};

var getAll = () => {
  console.log('getAll is executed');
};

module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll,
};
