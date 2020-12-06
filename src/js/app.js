import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@mdi/react';
import { mdiEraser, mdiLoading, mdiPencil, mdiPlusBox } from '@mdi/js';
import { InputModal } from './bootstrap_modal.js';
import { ErrorToast } from './bootstrap_toast.js';
import { add_message, delete_message, edit_message, fetch_last_action, fetch_messages } from './fetch_functions.js';
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
    size: 1,
    onClick: props.onEdit
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
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);
  const [errors, setErrors] = useState([]);
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
    delete_message(id, addError);
  }

  function handleAddMessageModalClose() {
    setAddMessageModal(false);
  }

  function handleEditMessageModalClose() {
    setEditMessageModal(false);
  }

  function handleAddMessageModalSave(text) {
    setAddMessageModal(false);
    const last_message = messages.slice().pop();
    setMessages(messages.slice().concat({
      id: last_message ? last_message.id + 1 : -1,
      text: text,
      preview: true
    }));
    add_message(text, addError);
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
    edit_message(editMessageId, text, addError);
  }

  function addError(text) {
    setErrors(errors.slice().concat({
      text: text,
      show: true
    }));
  }

  function handleClose(i) {
    setErrors(errors.map((error, index) => {
      if (index === i) {
        error.show = false;
      }

      return error;
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, messages.map(message => {
    return /*#__PURE__*/React.createElement(Message, {
      key: message.id,
      text: message.text,
      preview: message.preview,
      onEdit: () => handleEdit(message.id),
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
  })), /*#__PURE__*/React.createElement("div", {
    id: "error-area"
  }, errors.map((error, index) => {
    return /*#__PURE__*/React.createElement(ErrorToast, {
      key: index,
      text: error.text,
      show: error.show,
      onClose: () => handleClose(index)
    });
  })), /*#__PURE__*/React.createElement(InputModal, {
    show: addMessageModal,
    title: "Add message",
    onClose: handleAddMessageModalClose,
    onSave: handleAddMessageModalSave
  }), /*#__PURE__*/React.createElement(InputModal, {
    show: editMessageModal,
    title: "Edit message",
    onClose: handleEditMessageModalClose,
    onSave: handleEditMessageModalSave
  }));
}

ReactDOM.render( /*#__PURE__*/React.createElement(MessageList, null), document.getElementById('root'));