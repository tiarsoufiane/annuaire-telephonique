package com.annuaire.backend.service;

import com.annuaire.backend.model.Contact;
import com.annuaire.backend.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
    public Contact updateContact(Long id, Contact details) {
    Contact contact = contactRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Contact non trouvé avec l'id : " + id));
    
    contact.setPrenom(details.getPrenom());
    contact.setNom(details.getNom());
    contact.setTelephone(details.getTelephone());
    contact.setEmail(details.getEmail());
    
    return contactRepository.save(contact);
}
}