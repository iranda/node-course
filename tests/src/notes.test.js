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
        JSON.stringify([ note]));
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
      notes.removeNote(fileContentMock[0].title);

      expect(require('fs').writeFile.mock.calls.length).toEqual(1);
      expect(require('fs').writeFile.mock.calls[0][0]).toEqual(FileName);
      expect(require('fs').writeFile.mock.calls[0][1]).toEqual(
        JSON.stringify([]));
    });
  });

  it('should get one note', () => {
  });

  it('should get notes list', () => {
  });
});
