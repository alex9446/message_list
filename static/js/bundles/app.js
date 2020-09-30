/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/home/alex/Programmazione/GitHub/message_list/static/js/bundles";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Message(props) {\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"message\"\n  }, /*#__PURE__*/React.createElement(\"p\", null, props.text), /*#__PURE__*/React.createElement(\"span\", {\n    className: \"mdi mdi-pencil\",\n    onClick: props.edit\n  }), /*#__PURE__*/React.createElement(\"span\", {\n    className: \"mdi mdi-eraser\",\n    onClick: props.delete\n  }));\n}\n\nfunction Popup(props) {\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"popup\",\n    onClick: props.inherited.popup_toggle\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    onClick: e => e.stopPropagation()\n  }, /*#__PURE__*/React.createElement(\"div\", null, props.elem)));\n}\n\nfunction MessagePopup(props) {\n  const elem = /*#__PURE__*/React.createElement(\"div\", {\n    className: \"new_message\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    autoFocus: true,\n    onChange: props.store_value,\n    onKeyUp: e => {\n      if (e.key === 'Enter') {\n        props.save_value();\n      }\n    }\n  }), /*#__PURE__*/React.createElement(\"span\", {\n    className: \"mdi mdi-floppy\",\n    onClick: props.save_value\n  }));\n  return /*#__PURE__*/React.createElement(Popup, {\n    elem: elem,\n    inherited: props\n  });\n}\n\nclass MessageList extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      last_edit: null,\n      messages: [],\n      new_message_popup: false,\n      edit_message_popup: false,\n      edit_message_id: null,\n      message_value: ''\n    };\n  }\n\n  render_messages() {\n    return this.state.messages.map(message => {\n      return /*#__PURE__*/React.createElement(Message, {\n        key: message.id,\n        delete: () => this.message_delete(message.id),\n        edit: () => this.setState({\n          edit_message_popup: true,\n          edit_message_id: message.id\n        }),\n        text: message.text\n      });\n    });\n  }\n\n  message_delete(id) {\n    fetch('/messages/' + id, {\n      method: 'DELETE'\n    }).then(res => res.json()).then(result => {\n      if (result.error) {\n        console.warn(result.error);\n      } else {\n        console.debug('Message deleted!');\n      }\n    }).catch(error => console.warn(error));\n  }\n\n  message_store_value(e) {\n    this.setState({\n      message_value: e.target.value\n    });\n  }\n\n  new_message_popup_toggle() {\n    this.setState({\n      new_message_popup: !this.state.new_message_popup\n    });\n  }\n\n  new_message_save_value() {\n    fetch('/messages', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        text: this.state.message_value\n      })\n    }).then(res => res.json()).then(result => {\n      if (result.error) {\n        console.warn(result.error);\n      } else {\n        console.debug('Message created!');\n      }\n    }).catch(error => console.warn(error));\n    this.setState({\n      new_message_popup: false,\n      message_value: ''\n    });\n  }\n\n  edit_message_save_value() {\n    fetch('/messages/' + this.state.edit_message_id, {\n      method: 'PATCH',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        text: this.state.message_value\n      })\n    }).then(res => res.json()).then(result => {\n      if (result.error) {\n        console.warn(result.error);\n      } else {\n        console.debug('Message edited!');\n      }\n    }).catch(error => console.warn(error));\n    this.setState({\n      edit_message_popup: false,\n      edit_message_id: null,\n      message_value: ''\n    });\n  }\n\n  render() {\n    console.debug('Render MessageList');\n    return /*#__PURE__*/React.createElement(\"div\", null, this.state.new_message_popup ? /*#__PURE__*/React.createElement(MessagePopup, {\n      popup_toggle: () => this.new_message_popup_toggle(),\n      store_value: e => this.message_store_value(e),\n      save_value: () => this.new_message_save_value()\n    }) : null, this.state.edit_message_popup ? /*#__PURE__*/React.createElement(MessagePopup, {\n      popup_toggle: () => this.setState({\n        edit_message_popup: false\n      }),\n      store_value: e => this.message_store_value(e),\n      save_value: () => this.edit_message_save_value()\n    }) : null, /*#__PURE__*/React.createElement(\"div\", {\n      id: \"title\"\n    }, \"Message List\"), /*#__PURE__*/React.createElement(\"div\", {\n      id: \"list\"\n    }, this.render_messages()), /*#__PURE__*/React.createElement(\"div\", {\n      id: \"add\",\n      className: \"message\",\n      onClick: () => this.new_message_popup_toggle()\n    }, /*#__PURE__*/React.createElement(\"span\", {\n      className: \"mdi mdi-plus-box\"\n    })));\n  }\n\n  fetch_messages(last_edit) {\n    fetch('/messages').then(res => res.json()).then(result => {\n      if (result.error) {\n        console.warn(result.error);\n      } else {\n        this.setState({\n          last_edit: last_edit,\n          messages: result\n        });\n      }\n    }).catch(error => console.warn(error));\n  }\n\n  fetch_last_action() {\n    fetch('/last_action_on_messages').then(res => res.json()).then(result => {\n      if (result.value && result.value !== this.state.last_edit) {\n        this.fetch_messages(result.value);\n      }\n    }).catch(error => console.warn(error));\n  }\n\n  componentDidMount() {\n    this.fetch_messages(null);\n    this.interval = setInterval(() => this.fetch_last_action(), 1000);\n  }\n\n  componentWillUnmount() {\n    clearInterval(this.interval);\n  }\n\n}\n\nReactDOM.render( /*#__PURE__*/React.createElement(MessageList, null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });