import React from 'react';
import { Toast } from "react-bootstrap";

export function BaseToast(props) {
  return (
    <Toast
      show={props.show}
      onClose={props.onClose}
      animation={props.animation || true}
      autohide={props.autohide || true}
      delay={props.delay || 5000}
      style={{borderColor: props.borderColor || 'rgba(0,0,0,.1)'}}
    >
      <Toast.Header>
        <strong className="mr-auto">
          {props.title}
        </strong>
      </Toast.Header>
      <Toast.Body>
        {props.children}
      </Toast.Body>
    </Toast>
  );
}

export function ErrorToast(props) {
  return (
    <BaseToast
      title="Error"
      borderColor="red"
      show={props.show}
      onClose={props.onClose}
    >
      {props.text}
    </BaseToast>
  );
}
