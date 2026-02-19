import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class NotesComponent implements OnInit {

  currentUser: any = null;
  notes: any[] = [];

  noteData = {
    title: '',
    content: '',
    isShared: false
  };

  editingId: string | null = null;

  private baseUrl = 'https://school-notes-api.onrender.com/api';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      this.router.navigate(['/']);
      return;
    }

    this.currentUser = JSON.parse(storedUser);
    this.loadNotes();
  }

  loadNotes() {
    this.http.get<any[]>(`${this.baseUrl}/notes`).subscribe({
      next: (data) => this.notes = data,
      error: () => console.error('Error loading notes')
    });
  }

  submitNote() {

    if (this.editingId) {
      this.http.put(`${this.baseUrl}/notes/${this.editingId}`, {
        ...this.noteData,
        createdBy: this.currentUser.email
      }).subscribe(() => {
        this.resetForm();
        this.loadNotes();
      });

    } else {
      this.http.post(`${this.baseUrl}/notes`, {
        ...this.noteData,
        createdBy: this.currentUser.email
      }).subscribe(() => {
        this.resetForm();
        this.loadNotes();
      });
    }
  }

  startEditing(note: any) {
    this.editingId = note._id;
    this.noteData = {
      title: note.title,
      content: note.content,
      isShared: note.isShared
    };
  }

  deleteNote(id: string) {
    this.http.delete(`${this.baseUrl}/notes/${id}`).subscribe(() => {
      this.loadNotes();
    });
  }

  resetForm() {
    this.editingId = null;
    this.noteData = {
      title: '',
      content: '',
      isShared: false
    };
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
