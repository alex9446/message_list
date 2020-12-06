import React from 'react';
import { Toast } from "react-bootstrap";
export function BaseToast(props) {
  return /*#__PURE__*/React.createElement(Toast, {
    show: props.show,
    onClose: props.onClose,
    animation: props.animation || true,
    autohide: props.autohide || true,
    delay: props.delay || 5000,
    style: {
      borderColor: props.borderColor || 'rgba(0,0,0,.1)'
    }
  }, /*#__PURE__*/React.createElement(Toast.Header, null, /*#__PURE__*/React.createElement("strong", {
    className: "mr-auto"
  }, props.title)), /*#__PURE__*/React.createElement(Toast.Body, null, props.children));
}
export function ErrorToast(props) {
  return /*#__PURE__*/React.createElement(BaseToast, {
    title: "Error",
    borderColor: "red",
    show: props.show,
    onClose: props.onClose
  }, props.text);
}