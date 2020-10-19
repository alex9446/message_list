import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@mdi/react';
import { mdiEraser, mdiLoading, mdiPencil, mdiPlusBox } from '@mdi/js';
import { InputModal } from './bootstrap_modal.js';
import { add_message, delete_message, fetch_last_action, fetch_messages } from './fetch_functions.js';
import '../css/main.css';

function Message(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "message"
  }, /*#__PURE__*/React.createElement("p", null, props.text, " ", props.preview && /*#__PURE__*/React.createElement(Icon, {
    path: mdiLoading,
    size: 1,
    spin: true
  })), /*#__PURE__*/React.createElement(Icon, {
    className: "mdi mdi-pencil",
    path: mdiPencil,
    size: 1
  }), /*#__PURE__*/React.createElement(Icon, {
    className: "mdi mdi-eraser",
    path: mdiEraser,
    size: 1,
    onClick: props.onDelete
  }));
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
    setMessages(messages.slice().concat({
      text: text
    }));
    add_message(text);
  }

  return /*#__PURE__*/React.createElement("div", null, messages.map(message => {
    return /*#__PURE__*/React.createElement(Message, {
      key: message.id,
      text: message.text,
      preview: message.id ? false : true,
      onDelete: () => handleDelete(message.id)
    });
  }), /*#__PURE__*/React.createElement("div", {
    id: "add",
    className: "message",
    onClick: handleAdd
  }, /*#__PURE__*/React.createElement("p", null, "Add message"), /*#__PURE__*/React.createElement(Icon, {
    className: "mdi mdi-plus-box",
    path: mdiPlusBox,
    size: 1
  })), /*#__PURE__*/React.createElement(InputModal, {
    show: addMessageModal,
    onClose: handleAddMessageModalClose,
    onSave: handleAddMessageModalSave
  }));
}

ReactDOM.render( /*#__PURE__*/React.createElement(MessageList, null), document.getElementById('root'));