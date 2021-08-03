import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Cards = ({ title, originalName, id }) => (
  <li>
    <Link key={id} to={`/movies/${id}`}>
      {title ? title : originalName}
    </Link>
  </li>
);

Cards.propTypes = {
  title: PropTypes.string,
  originalName: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default Cards;
