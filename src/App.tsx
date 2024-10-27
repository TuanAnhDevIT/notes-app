import React, { useEffect, useState } from 'react';
import './App.css';

interface Note {
  id: number;
  title: string;
  content: string;
}
function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/notes');
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5500/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      const newNote: Note = await response.json();
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
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
