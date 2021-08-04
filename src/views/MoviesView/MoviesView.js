import React, { useState, useEffect, Suspense } from 'react';
import { fetchOnSearch } from '../../helpers/api';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Error from '../../components/Errors/Errors';
import Form from '../../components/Form';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';

function MoviesView() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('pending');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (search === '') {
      return;
    }
    (async () => {
      try {
        setStatus('loading');
        const listFilms = await fetchOnSearch(search);
        setMovies(s => [...s, ...listFilms.results]);
        if (listFilms.results.length === 0) {
          throw new Error('MoviesView');
        }
        setStatus('resolved');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, [search]);

  useEffect(() => {
    if (movies.length) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  useEffect(() => {
    if (localStorage.getItem('movies')?.length > 2) {
      setMovies(JSON.parse(localStorage.getItem('movies')));

      setStatus('resolved');
      return;
    }
  }, []);

  function onSubmit(ev) {
    if (ev.target.searchFilm.value === '') {
      return;
    }
    setMovies([]);
    setSearch(ev.target.searchFilm.value);
  }

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {location.pathname !== '/' && <Button onGoBack={onGoBack}>BACK</Button>}
      <Form onSubmit={onSubmit} />
      <ul>
        {status === 'resolved' &&
          movies.map(({ title, original_name, id }) => (
            <Suspense key={id} fallback={<Spinner />}>
              <li>
                <Link
                  key={id}
                  to={{
                    pathname: `/movies/${id}`,
                    state: { from: location, label: 'Back to the list' },
                  }}
                >
                  {title ?? original_name}
                </Link>
              </li>
            </Suspense>
          ))}
        {status === 'error' && <Error />}
      </ul>
    </>
  );
}

export default MoviesView;
