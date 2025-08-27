import React, { useState, useEffect } from 'react';
import './index.js';
import Contact from './contacts.js';

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [rowLimit, setRowLimit] = useState(10);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', notes: '', description: '' });
  const [notes] = useState('');
  const [description, setDescription] = useState('');
  const descriptions=["Widdow,","Child","Colleague","Partner","Sibling","Parent","Spouse","Relative","Neighbor","Marriede", "Single", "Family","Friend","Work","Other"];
  const descriptionss=descriptions.map(description=>(
    <option>{description}</option>
  ));
  

  // Зареждане на контактите от бекенд
  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error('Error loading contacts:', err));
  }, []);

  const addContact = () => {
    if (newContact.name && newContact.phone && newContact.email) {
      fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add contact');
        return res.json();
      })
      .then(addedContact => {
        setContacts([...contacts, addedContact]);
        setNewContact({ name: '', phone: '', email: '', notes: '', description: '' });
      })
      .catch(err => console.error(err));
    }
  };

  const removeContact = (index) => {
    const contactToDelete = contacts[index];
    fetch(`http://localhost:5000/contacts/${contactToDelete.id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete contact');
      const updated = contacts.filter((_, i) => i !== index);
      setContacts(updated);
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h3>Phone Book</h3>

      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="search"
          pattern=".*\\S.*"
          required
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="caret"></span>
      </form>

      <div>
        No of contacts to show:
        <input
          type="number"
          step="1"
          min="0"
          value={rowLimit}
          onChange={e => setRowLimit(Number(e.target.value))}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>Email</th><th>Options</th><th>Notes</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, rowLimit)
            .map((c, i) => (
              <Contact key={c.id} contact={c} onDelete={() => removeContact(i)} />
            ))}
            <span>Fave </span>
            <br/>
            <input      
            type="checkbox"                
            />
        </tbody>
   
      </table>

      <div className="panel-footer">
        <form
          className="form-inline"
          onSubmit={e => {
            e.preventDefault();
            addContact();
          }}
        >
          <div className="form-group">
            <span>Name：</span>
            <input
              type="text"
              className="form-control"
              maxLength="99"
              value={newContact.name}
              onChange={e => setNewContact({ ...newContact, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <span>Phone number：</span>
            <input
              type="tel"
              className="form-control"
              placeholder="xx-xxx-xxxx"
              value={newContact.phone}
              onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
              pattern="^\d{2}-\d{3}-\d{4}$"
            />
          </div>
          <div className="form-group">
            <span>E-mail：</span>
            <input
              type="email"
              className="form-control"
              placeholder="email@example.com"
              value={newContact.email}
              onChange={e => setNewContact({ ...newContact, email: e.target.value })}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />
          </div>
          <div className="form-group">
            <span>Notes: </span>
            <input
              type="text"
              className='from-control'
              rowLimit="200"
              placeholder="Notes"
              tabIndex="-1"
              value={notes}
            onChange={e => setNewContact({ ...newContact, notes: e.target.value })}     
/>
          </div>
          <div className="form-group">
            <span>Description: </span>
            <select
              className='from-control'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}        
            >
              <option value="" disabled>Choose description</option>
              {descriptionss}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            <span role="img" aria-label="thumbs-up"></span> Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
