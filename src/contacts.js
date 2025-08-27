import React from 'react';

export default function Contact({ contact, onDelete }) {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>{contact.fave}</td>
      <td>{contact.notes}</td>
      <td>{contact.description}</td>
      <td>
        <button onClick={onDelete}>🗑️</button>
      </td>
    </tr>
  );
}
