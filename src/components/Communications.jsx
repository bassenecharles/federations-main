import React, { useState } from 'react';
import './Communications.css';

function Communications() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Club A', subject: 'Demande de renseignements', content: 'Bonjour, nous souhaiterions des informations sur...', timestamp: '2024-08-06 10:00' },
    { id: 2, sender: 'Ligue B', subject: 'Rappel de réunion', content: 'Bonjour, ceci est un rappel pour la réunion du...', timestamp: '2024-08-05 15:30' },
    { id: 3, sender: 'Arbitre X', subject: 'Disponibilités', content: 'Bonjour, voici mes disponibilités pour les prochains matchs...', timestamp: '2024-08-04 09:15' },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ recipient: '', subject: '', content: '' });
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);

  const handleMessageSelect = (id) => {
    setSelectedMessage(messages.find(message => message.id === id));
  };

  const handleNewMessageClick = () => {
    setShowNewMessageForm(true);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage({ ...newMessage, [event.target.name]: event.target.value });
  };

  const handleNewMessageSubmit = (event) => {
    event.preventDefault();
    // Add logic to send the new message (e.g., to a backend)
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'Vous', // Assuming the current user is sending
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date().toLocaleString(),
    }]);
    setShowNewMessageForm(false);
    setNewMessage({ recipient: '', subject: '', content: '' });
  };

  return (
    <div className="communications-page">
      <h2>Communications</h2>

      <section className="messaging-container">
        <div className="message-list">
          <h3>Messages Reçus</h3>
          <button className="new-message-button" onClick={handleNewMessageClick}>Nouveau Message</button>
          <ul>
            {messages.map(message => (
              <li key={message.id} onClick={() => handleMessageSelect(message.id)} className={selectedMessage?.id === message.id ? 'selected' : ''}>
                <div className="message-sender">{message.sender}</div>
                <div className="message-subject">{message.subject}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="message-content">
          {selectedMessage ? (
            <>
              <div className="message-header">
                <h4>{selectedMessage.subject}</h4>
                <p>De: {selectedMessage.sender}</p>
                <p className="message-timestamp">{selectedMessage.timestamp}</p>
              </div>
              <div className="message-body">
                <p>{selectedMessage.content}</p>
              </div>
            </>
          ) : (
            <p>Sélectionner un message pour le lire.</p>
          )}
        </div>
      </section>

      {showNewMessageForm && (
        <div className="new-message-form">
          <h3>Nouveau Message</h3>
          <form onSubmit={handleNewMessageSubmit}>
            <input type="text" name="recipient" placeholder="Destinataire" value={newMessage.recipient} onChange={handleNewMessageChange} />
            <input type="text" name="subject" placeholder="Objet" value={newMessage.subject} onChange={handleNewMessageChange} />
            <textarea name="content" placeholder="Contenu du message" value={newMessage.content} onChange={handleNewMessageChange}></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Communications;
