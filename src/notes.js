var addNote = (title, body) => {
  const note = {
    title,
    body
  };
  const notes = [];
  notes.push(note);
};

var removeNote = () => {
  console.log('removeNote is executed');
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
