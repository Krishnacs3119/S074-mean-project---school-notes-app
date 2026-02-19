import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css'
})
export class NotesComponent implements OnInit {

  currentUser: any;
  notes: any[] = [];

  noteData = {
    title: '',
    content: '',
    isShared: false
  };

  editingId: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

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
    this.apiService.getNotes(this.currentUser.role, this.currentUser.username)
      .subscribe((data: any) => {
        this.notes = data;
      });
  }

  submitNote() {

    const notePayload = {
      title: this.noteData.title,
      content: this.noteData.content,
      isShared: this.noteData.isShared,
      createdBy: this.currentUser.username
    };

    if (this.editingId) {

      this.apiService.updateNote(this.editingId, notePayload)
        .subscribe(() => {
          this.resetForm();
          this.loadNotes();
        });

    } else {

      this.apiService.addNote(notePayload)
        .subscribe(() => {
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
    this.apiService.deleteNote(id)
      .subscribe(() => {
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
