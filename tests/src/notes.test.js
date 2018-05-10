const FileName = require('../../constants.js').FILE_NAME;

describe('notes operations', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('addNote', () => {
    let note;

    beforeAll(() => {
      note = {
        title: 'some title',
        body: 'body',
      }
    });

    it('should add new note to empty storage', () => {
      jest.mock('fs', () => ({
        writeFile: jest.fn(),
      }));

      const notes = require('../../src/notes.js');
      notes.addNote(note.title, note.body);

      expect(require('fs').writeFile.mock.calls.length).toEqual(1);
      expect(require('fs').writeFile.mock.calls[0][0]).toEqual(FileName);
      expect(require('fs').writeFile.mock.calls[0][1]).toEqual(
        JSON.stringify([ note ]));
    });

    it('should add new note to not empty storage', () => {
      const fileContentMock = [ {title: 'first note', body: 'first note body'} ];

      jest.doMock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue(
          JSON.stringify(fileContentMock)),

        writeFile: jest.fn(),
      }));

      const notes = require('../../src/notes.js');
      notes.addNote(note.title, note.body);

      expect(require('fs').writeFile.mock.calls.length).toEqual(1);
      expect(require('fs').writeFile.mock.calls[0][0]).toEqual(FileName);
      expect(require('fs').writeFile.mock.calls[0][1]).toEqual(
        JSON.stringify([ ...fileContentMock, note]));
    });

    it('should not add new note if note with the same title already exists', () => {
      const fileContentMock = [ {title: 'first note', body: 'first note body'} ];

      jest.doMock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue(
          JSON.stringify(fileContentMock)),

        writeFile: jest.fn(),
      }));

      const notes = require('../../src/notes.js');
      notes.addNote(fileContentMock[0].title, fileContentMock[0].body);

      expect(require('fs').writeFile.mock.calls.length).toEqual(0);
    });
  });

  describe('removeNote', () => {
    it('should remove note', () => {
      const fileContentMock = [ {title: 'first note', body: 'first note body'} ];

      jest.doMock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue(
          JSON.stringify(fileContentMock)),

        writeFile: jest.fn(),
      }));

      const notes = require('../../src/notes.js');

      expect(notes.removeNote(fileContentMock[0].title)).toEqual(true);

      expect(require('fs').writeFile.mock.calls.length).toEqual(1);
      expect(require('fs').writeFile.mock.calls[0][0]).toEqual(FileName);
      expect(require('fs').writeFile.mock.calls[0][1]).toEqual(
        JSON.stringify([]));
    });

    it('should not remove note and writeFile if note is not exist', () => {
      const fileContentMock = [ {title: 'first note', body: 'first note body'} ];

      jest.doMock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue(
          JSON.stringify(fileContentMock)),

        writeFile: jest.fn(),
      }));

      const notes = require('../../src/notes.js');

      expect(notes.removeNote('random title not from notes list')).toEqual(false);
      expect(require('fs').writeFile.mock.calls.length).toEqual(0);
    });
  });

  describe('getNote', () => {
    it('should get one note if it was saved', () => {
      const fileContentMock = [ {title: 'first note', body: 'first note body'} ];
      jest.doMock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue(
          JSON.stringify(fileContentMock)),
      }));

      const notes = require('../../src/notes.js');

      expect(notes.getNote(fileContentMock[0].title)).toEqual(fileContentMock[0]);
    });

    it('should not get anything if note is not exist', () => {
      const fileContentMock = [ {title: 'first note', body: 'first note body'} ];
      jest.doMock('fs', () => ({
        readFileSync: jest.fn().mockReturnValue(
          JSON.stringify(fileContentMock)),
      }));

      const notes = require('../../src/notes.js');

      expect(notes.getNote('random title not from notes list')).toEqual(undefined);
    });
  });

  it('should get notes list', () => {
  });
});
