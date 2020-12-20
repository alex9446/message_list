import React, { useState } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';

export function BaseModal(props) {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>
          {props.confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function InputModal(props) {
  const [text, setText] = useState('')

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSave() {
    props.onSave(text);
  }

  return (
    <BaseModal
      show={props.show}
      title={props.title}
      onClose={props.onClose}
      onConfirm={handleSave}
      confirmText="Save"
    >
      <FormControl
        type="text"
        text={text}
        onChange={handleChange}
        onKeyUp={e => {if (e.key === 'Enter') {handleSave()}}}
      />
    </BaseModal>
  );
}
