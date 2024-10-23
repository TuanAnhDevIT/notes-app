import React, { useState } from 'react';
import './App.css';

interface Note {
  id: number;
  title: string;
  content: string;
}
function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'test note 1',
      content: 'bla bla note1',
    },
    {
      id: 2,
      title: 'test note 2 ',
      content: 'bla bla note2',
    },
    {
      id: 3,
      title: 'test note 3',
      content: 'bla bla note3',
    },
    {
      id: 4,
      title: 'test note 4 ',
      content: 'bla bla note4',
    },
    {
      id: 5,
      title: 'test note 5',
      content: 'bla bla note5',
    },
    {
      id: 6,
      title: 'test note 6',
      content: 'bla bla note6',
    },
  ]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('title: ', title);
    console.log('content: ', content);
    if (title && content) {
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
    }
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedNote) {
      const newNotes = notes.map((note) => {
        if (note.id === selectedNote.id) {
          return { ...note, title: title, content: content };
        }
        return note;
      });
      setNotes(newNotes);
      setSelectedNote(null);
      setTitle('');
      setContent('');
    }
  };
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDeleteNote = (event: React.MouseEvent, note: Note) => {
    event.stopPropagation();
    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };
  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" onClick={handleUpdateNote}>
              Update
            </button>
          </div>
        ) : (
          <button type="submit" onClick={handleAddNote}>
            Add
          </button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            className="note-item"
            key={note.id}
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button
                type="button"
                onClick={(event) => handleDeleteNote(event, note)}
              >
                x
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
