import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from './services/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent implements OnInit {
  contacts: any[] = [];
  newContact = { prenom: '', nom: '', telephone: '', email: '' };

  editingContact: any = null;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      this.cdr.detectChanges();
    });
  }

  addContact() {
    this.contactService.saveContact(this.newContact).subscribe(() => {
      this.loadContacts();
      this.newContact = { prenom: '', nom: '', telephone: '', email: '' };
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => {
      this.loadContacts();
    });
  }

  startEdit(contact: any) {
    this.editingContact = { ...contact };
  }

  cancelEdit() {
    this.editingContact = null;
  }
  updateContact() {
    if (this.editingContact) {
      this.contactService.updateContact(this.editingContact.id, this.editingContact).subscribe(() => {
        this.loadContacts(); 
        this.editingContact = null;
      });
    }
  }
}