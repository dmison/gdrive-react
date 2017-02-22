// https://github.com/gaearon/todos/blob/03-persisting-state-to-local-storage/src/localStorage.js

const storage_name = 'polydactyl-state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storage_name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storage_name, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
