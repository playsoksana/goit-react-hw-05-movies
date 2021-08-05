import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ onGoBack, children }) {
  return (
    <button type="button" className={styles.Button} onClick={onGoBack}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
export default Button;
