import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  
  // Note Form Data
  noteData = { title: '', content: '', isShared: false, createdBy: '' };
  
  // Tracking Variables
  currentUser: any = null;
  editingId: string | null = null; // If this has an ID, we are in Edit Mode

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      this.router.navigate(['/']); 
      return;
    }
    this.currentUser = JSON.parse(userString);
    this.getNotes();
  }

  getNotes() {
    this.http.get(`http://localhost:3000/api/notes?role=${this.currentUser.role}`)
      .subscribe({
        next: (data: any) => {
          this.notes = data; 
          this.cd.detectChanges(); 
        },
        error: (err) => console.error(err)
      });
  }

  // Called when you click "Post Note" or "Update Note"
  submitNote() {
    if (this.editingId) {
      // EDIT MODE: Update existing note
      this.http.put(`http://localhost:3000/api/notes/${this.editingId}`, this.noteData)
        .subscribe(() => {
          this.getNotes();
          this.resetForm();
        });
    } else {
      // ADD MODE: Create new note
      this.noteData.createdBy = this.currentUser.username;
      this.http.post('http://localhost:3000/api/notes', this.noteData)
        .subscribe(() => {
          this.getNotes();
          this.resetForm();
        });
    }
  }

  // Called when you click "Edit" on a note card
  startEditing(note: any) {
    this.editingId = note._id; // Switch to Edit Mode
    // Copy the note's data into the form so we can change it
    this.noteData = { 
      title: note.title, 
      content: note.content, 
      isShared: note.isShared, 
      createdBy: note.createdBy 
    };
  }

  deleteNote(id: string) {
    if(confirm("Are you sure you want to delete this?")) {
      this.http.delete(`http://localhost:3000/api/notes/${id}`)
        .subscribe(() => {
          this.getNotes(); 
        });
    }
  }

  resetForm() {
    this.editingId = null; // Switch back to Add Mode
    this.noteData = { title: '', content: '', isShared: false, createdBy: this.currentUser.username };
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}