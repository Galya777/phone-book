import React, { useState } from 'react';
import './index.js';
import Contact from './contacts.js';

function App() {
  const [contacts, setContacts] = useState([
    { name: "John Doe", phone: "12-345-6789", email: "john@example.com" },
    { name: "Jane Smith", phone: "98-765-4321", email: "jane@example.com" }
  ]);
  const [search, setSearch] = useState('');
  const [rowLimit, setRowLimit] = useState(10);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });

  const addContact = () => {
    if (newContact.name && newContact.phone && newContact.email) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: '', phone: '', email: '' });
    }
  };

  const removeContact = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
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
            <th>Name</th><th>Phone</th><th>Email</th><th>Options</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, rowLimit)
            .map((c, i) => (
              <Contact key={i} contact={c} onDelete={() => removeContact(i)} />
            ))}
        </tbody>
      </table>

      <div className="add-form">
        <input
          placeholder="Name"
          value={newContact.name}
          onChange={e => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          placeholder="xx-xxx-xxxx"
          value={newContact.phone}
          onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          placeholder="email@example.com"
          value={newContact.email}
          onChange={e => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
    </div>
  );
}

export default App;
