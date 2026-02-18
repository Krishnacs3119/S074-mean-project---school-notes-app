import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {
  // 1. Update this URL with the live link Render gives you later!
  // For now, it points to your intended backend name.
  private apiUrl = 'https://school-notes-api.onrender.com/api/notes'; 
  
  notes: any[] = [];
  newNote = { title: '', content: '', role: 'student' }; // Default role

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNotes();
  }

  // GET: Fetch all notes from the Cloud Database
  fetchNotes() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.notes = data;
        console.log('Notes loaded successfully');
      },
      error: (err) => console.error('Error fetching notes:', err)
    });
  }

  // POST: Add a new note to MongoDB Atlas
  addNote() {
    if (this.newNote.title && this.newNote.content) {
      this.http.post(this.apiUrl, this.newNote).subscribe({
        next: () => {
          this.fetchNotes(); // Refresh list
          this.newNote = { title: '', content: '', role: 'student' }; // Reset form
        },
        error: (err) => console.error('Error adding note:', err)
      });
    }
  }

  // DELETE: Remove a note by ID
  deleteNote(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.fetchNotes(),
      error: (err) => console.error('Error deleting note:', err)
    });
  }
}