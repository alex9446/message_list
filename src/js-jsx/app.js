import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@mdi/react';
import { mdiEraser, mdiLoading, mdiPencil, mdiPlusBox } from '@mdi/js';

import { InputModal } from './bootstrap_modal.js';
import { add_message, delete_message, fetch_last_action, fetch_messages } from './fetch_functions.js';

import '../css/main.css';

function Message(props) {
  return (
    <div className="message">
      <p>{props.text} {props.preview && <Icon path={mdiLoading} size={1} spin />}</p>
      <Icon className="mdi mdi-pencil" path={mdiPencil} size={1} />
      <Icon className="mdi mdi-eraser" path={mdiEraser} size={1} onClick={props.onDelete} />
    </div>
  );
}

function MessageList() {
  const [lastAction, setLastAction] = useState(null);
  const [messages, setMessages] = useState([]);
  const [addMessageModal, setAddMessageModal] = useState(false);

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

  function handleDelete(id) {
    setMessages(messages.filter(message => message.id !== id));
    delete_message(id);
  }

  function handleAddMessageModalClose() {
    setAddMessageModal(false);
  }

  function handleAddMessageModalSave(text) {
    setAddMessageModal(false);
    setMessages(messages.slice().concat({text: text}));
    add_message(text);
  }

  return (
    <div>
      {messages.map(message => {
        return (
          <Message
            key={message.id}
            text={message.text}
            preview={message.id ? false : true}
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
        onClose={handleAddMessageModalClose}
        onSave={handleAddMessageModalSave}
      />
    </div>
  );
}

ReactDOM.render(
  <MessageList />,
  document.getElementById('root')
);
