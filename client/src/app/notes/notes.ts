import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {
  // Use the live URL from your Render dashboard
  private apiUrl = 'https://school-notes-api.onrender.com/api/notes'; 
  
  notes: any[] = [];
  newNote = { title: '', content: '', role: 'student' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNotes();
  }

  // GET: Fetch notes from your cloud database
  fetchNotes() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.notes = data;
        console.log('Notes loaded from cloud');
      },
      error: (err) => console.error('Error fetching notes:', err)
    });
  }

  // POST: Save a new note to MongoDB Atlas
  addNote() {
    if (this.newNote.title && this.newNote.content) {
      this.http.post(this.apiUrl, this.newNote).subscribe({
        next: () => {
          this.fetchNotes(); 
          this.newNote = { title: '', content: '', role: 'student' }; 
        },
        error: (err) => console.error('Error adding note:', err)
      });
    }
  }

  // DELETE: Remove a note using its ID
  deleteNote(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.fetchNotes(),
      error: (err) => console.error('Error deleting note:', err)
    });
  }
}