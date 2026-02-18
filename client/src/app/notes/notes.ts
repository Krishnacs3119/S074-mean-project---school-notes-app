import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ngIf aur ngFor ke liye
import { FormsModule } from '@angular/forms'; // ngModel ke liye

@Component({
  selector: 'app-notes',
  standalone: true, // Standalone component setting
  imports: [CommonModule, FormsModule, HttpClientModule], // Zaroori modules
  templateUrl: './notes.html',
  styleUrls: ['./notes.css']
})
export class NotesComponent implements OnInit {
  // Aapka live Render backend API URL
  private apiUrl = 'https://school-notes-api.onrender.com/api/notes';
  
  notes: any[] = [];
  
  // Template ke liye missing variables jo AI ne bataye the
  currentUser: any = { username: 'Krishna', role: 'student' }; 
  editingId: string | null = null;
  noteData = { title: '', content: '', isShared: false };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNotes();
  }

  // Database se notes fetch karne ke liye
  fetchNotes() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.notes = data,
      error: (err) => console.error('Error fetching notes:', err)
    });
  }

  // Note save ya update karne ke liye
  submitNote() {
    if (this.noteData.title && this.noteData.content) {
      if (this.editingId) {
        // Update logic
        this.http.put(`${this.apiUrl}/${this.editingId}`, this.noteData).subscribe(() => {
          this.fetchNotes();
          this.resetForm();
        });
      } else {
        // Add logic
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
    this.noteData = { 
      title: note.title, 
      content: note.content, 
      isShared: !!note.isShared 
    };
  }

  resetForm() {
    this.editingId = null;
    this.noteData = { title: '', content: '', isShared: false };
  }

  logout() {
    console.log('User logging out...');
    // Yahan aap redirect ka logic bhi dal sakte hain
  }
}