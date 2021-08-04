import React from 'react';
import PropTypes from 'prop-types';

function Button({ onGoBack, children }) {
  return (
    <button type="button" onClick={onGoBack}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
export default Button;
