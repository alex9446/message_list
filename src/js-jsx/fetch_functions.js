function general_fetch(url, callback, options = {}) {
  fetch(url, options)
  .then(response => response.json())
  .then(result => callback(result))
  .catch(error => console.warn(error));
}

function general_fetch_with_options(url, options, callback) {
  general_fetch(url, callback, options);
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

export function delete_message(id) {
  general_fetch_with_options('/messages/' + id, { method: 'DELETE' }, result => {
    if (result.error) {
      console.warn(result.error);
    } else {
      console.debug('Message deleted!')
    }
  });
}

export function add_message(text) {
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
        console.warn(result.error);
      } else {
        console.debug('Message created!')
      }
    }
  );
}
