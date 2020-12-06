function general_fetch(url, callback, onError = null, options = {}) {
  fetch(url, options)
  .then(response => response.json())
  .then(result => callback(result))
  .catch(error => {
    if (onError) {
      onError(error);
    } else {
      console.warn(error);
    }
  });
}

function general_fetch_with_options(url, options, callback, onError = null) {
  general_fetch(url, callback, onError, options);
}

export function fetch_last_action(lastAction, setLastAction) {
  general_fetch('/last_action_on_messages', result => {
    if (result.value && (result.value !== lastAction)) {
      setLastAction(result.value);
    }
  });
}

export function fetch_messages(setMessages) {
  general_fetch('/messages', result => {
    if (result.error) {
      console.warn(result.error);
    } else {
      setMessages(result);
    }
  });
}

export function add_message(text, addError) {
  function handleError(error) {
    console.error(error);
    addError('Message not added');
  }
  general_fetch_with_options(
    '/messages',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text
      })
    },
    result => {
      if (result.error) {
        handleError(result.error);
      } else {
        console.debug('Message created!')
      }
    },
    handleError
  );
}

export function edit_message(id, text, addError) {
  function handleError(error) {
    console.error(error);
    addError('Message not edited');
  }
  general_fetch_with_options(
    '/messages/' + id,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text
      })
    },
    result => {
      if (result.error) {
        handleError(result.error);
      } else {
        console.debug('Message edited!')
      }
    },
    handleError
  );
}

export function delete_message(id, addError) {
  function handleError(error) {
    console.error(error);
    addError('Message not deleted');
  }
  general_fetch_with_options(
    '/messages/' + id,
    {
      method: 'DELETE'
    },
    result => {
      if (result.error) {
        handleError(result.error);
      } else {
        console.debug('Message deleted!')
      }
    },
    handleError
  );
}
