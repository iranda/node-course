const notes = require('../../src/notes.js');

describe('addNote', () => {
  let note;

  beforeAll(() => {
    note = {
      title: 'some title',
      body: 'body',
    }
  });

  test('should add new note to the empty storage', () => {
    jest.mock('fs', () => ({
      readFileSync: jest.fn(),
    }));

    expect(notes.addNote(note.title, note.body)).toEqual(note);
  });

  // test('should add new note to not empty storage', () => {
  //   notes.addNote(title, body);
  // });
});


test('should remove note', () => {
});

test('should get one note', () => {
});

test('should get notes list', () => {
});
