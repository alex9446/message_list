import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@mdi/react';
import { mdiEraser, mdiLoading, mdiPencil, mdiPlusBox } from '@mdi/js';

import { InputModal } from './bootstrap_modal.js';
import { add_message, delete_message, edit_message, fetch_last_action, fetch_messages } from './fetch_functions.js';

import '../css/main.css';

function Message(props) {
  return (
    <div className="message">
      <p>{props.text} {props.preview && <Icon path={mdiLoading} size={1} spin />}</p>
      <Icon className="mdi mdi-pencil" path={mdiPencil} size={1} onClick={props.onEdit} />
      <Icon className="mdi mdi-eraser" path={mdiEraser} size={1} onClick={props.onDelete} />
    </div>
  );
}

function MessageList() {
  const [lastAction, setLastAction] = useState(null);
  const [messages, setMessages] = useState([]);
  const [addMessageModal, setAddMessageModal] = useState(false);
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);

  useEffect(() => {
    fetch_messages(setMessages);
  }, [lastAction]);

  useEffect(() => {
    fetch_last_action(lastAction, setLastAction);
    const interval = setInterval(() => fetch_last_action(lastAction, setLastAction), 5000);
    return () => clearInterval(interval);
  }, []);

  function handleAdd() {
    setAddMessageModal(true);
  }

  function handleEdit(id) {
    setEditMessageModal(true);
    setEditMessageId(id);
  }

  function handleDelete(id) {
    setMessages(messages.filter(message => message.id !== id));
    delete_message(id);
  }

  function handleAddMessageModalClose() {
    setAddMessageModal(false);
  }

  function handleEditMessageModalClose() {
    setEditMessageModal(false);
  }

  function handleAddMessageModalSave(text) {
    setAddMessageModal(false);
    setMessages(messages.slice().concat({
      id: messages.slice().pop().id + 1,
      text: text,
      preview: true
    }));
    add_message(text);
  }

  function handleEditMessageModalSave(text) {
    setEditMessageModal(false);
    setMessages(messages.map(message => {
      if (message.id === editMessageId) {
        message.text = text;
        message.preview = true;
      }
      return message;
    }));
    edit_message(editMessageId, text);
  }

  return (
    <div>
      {messages.map(message => {
        return (
          <Message
            key={message.id}
            text={message.text}
            preview={message.preview}
            onEdit={() => handleEdit(message.id)}
            onDelete={() => handleDelete(message.id)}
          />
        );
      })}
      <div id="add" className="message" onClick={handleAdd} >
        <p>Add message</p>
        <Icon className="mdi mdi-plus-box" path={mdiPlusBox} size={1} />
      </div>
      <InputModal
        show={addMessageModal}
        title="Add message"
        onClose={handleAddMessageModalClose}
        onSave={handleAddMessageModalSave}
      />
      <InputModal
        show={editMessageModal}
        title="Edit message"
        onClose={handleEditMessageModalClose}
        onSave={handleEditMessageModalSave}
      />
    </div>
  );
}

ReactDOM.render(
  <MessageList />,
  document.getElementById('root')
);
