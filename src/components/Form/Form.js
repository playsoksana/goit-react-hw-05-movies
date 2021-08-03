import { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.css';

const Form = ({ onSubmit }) => {
  const [valueInput, setValueInput] = useState('');

  const notify = text => toast(text);

  function onChangeInput({ target: { value } }) {
    setValueInput(value);
  }

  function onSubmitForm(ev) {
    ev.preventDefault();
    if (ev.target.searchFilm.value.trim('').length === 0) {
      notify('You entered an empty line');
      return;
    }
    onSubmit(ev);
    setValueInput('');
  }

  return (
    <>
      <form onSubmit={onSubmitForm} className={styles.Form}>
        <label>
          <input
            className={styles.Input}
            onChange={onChangeInput}
            type="text"
            name="searchFilm"
            value={valueInput}
          ></input>
        </label>
        <button className={styles.Button} type="submit">
          Search
        </button>
      </form>

      <ToastContainer />
    </>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
