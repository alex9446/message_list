import React, { useState } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export function BaseModal(props) {
  return /*#__PURE__*/React.createElement(Modal, {
    show: props.show,
    onHide: props.onClose
  }, /*#__PURE__*/React.createElement(Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/React.createElement(Modal.Title, null, props.title)), /*#__PURE__*/React.createElement(Modal.Body, null, props.children), /*#__PURE__*/React.createElement(Modal.Footer, null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: props.onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: props.onConfirm
  }, props.confirmText)));
}
export function InputModal(props) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSave() {
    props.onSave(text);
  }

  return /*#__PURE__*/React.createElement(BaseModal, {
    show: props.show,
    title: props.title,
    onClose: props.onClose,
    onConfirm: handleSave,
    confirmText: "Save"
  }, /*#__PURE__*/React.createElement(FormControl, {
    type: "text",
    text: text,
    onChange: handleChange,
    onKeyUp: e => {
      if (e.key === 'Enter') {
        handleSave();
      }
    }
  }));
}