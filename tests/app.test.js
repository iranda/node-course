const app = require('../app.js');
const COMMANDS = require('../constants.js').COMMANDS;
const notes = require.requireMock('../src/notes.js');

jest.mock('../src/notes.js');

test('should execute note operation according to recieved command', () => {
  notes.addNote = jest.fn();
  app.operateWithNotes(COMMANDS.ADD);
  expect(notes.addNote).toBeCalled();
});

test('should not execute if command is not passed', () => {
  expect(app.operateWithNotes(123)).toBeNull();
});
