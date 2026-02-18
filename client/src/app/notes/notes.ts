import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ngIf/ngFor ke liye
import { FormsModule } from '@angular/forms'; // ngModel ke liye

@Component({
  selector: 'app-notes',
  standalone: true, // Ye line zaroori hai
  imports: [CommonModule, FormsModule, HttpClientModule], // Saare zaroori modules yahan add kiye hain
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {
  private apiUrl = 'https://school-notes-api.onrender.com/api/notes';
  
  notes: any[] = [];
  currentUser: any = { username: 'Krishna', role: 'student' }; 
  editingId: string | null = null;
  noteData = { title: '', content: '', isShared: false };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.notes = data,
      error: (err) => console.error('Error fetching notes:', err)
    });
  }

  submitNote() {
    if (this.noteData.title && this.noteData.content) {
      if (this.editingId) {
        this.http.put(`${this.apiUrl}/${this.editingId}`, this.noteData).subscribe(() => {
          this.fetchNotes();
          this.resetForm();
        });
      } else {
        this.http.post(this.apiUrl, this.noteData).subscribe(() => {
          this.fetchNotes();
          this.resetForm();
        });
      }
    }
  }

  deleteNote(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.fetchNotes());
  }

  startEditing(note: any) {
    this.editingId = note._id;
    this.noteData = { title: note.title, content: note.content, isShared: !!note.isShared };
  }

  resetForm() {
    this.editingId = null;
    this.noteData = { title: '', content: '', isShared: false };
  }

  logout() {
    console.log('Logging out...');
  }
}