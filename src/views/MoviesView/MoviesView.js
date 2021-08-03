import React, { useState, useEffect, lazy, Suspense } from 'react';
import { fetchOnSearch } from '../../helpers/api';
import Error from '../../components/Errors/Errors';
import Form from '../../components/Form';
import Spinner from '../../components/Spinner/Spinner';
const Cards = lazy(() =>
  import(`../../components/Cards` /*webpackChunkName: 'Cards'*/),
);

function MoviesView() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('pending');

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

  function onSubmit(ev) {
    if (ev.target.searchFilm.value === '') {
      return;
    }
    setMovies([]);
    setSearch(ev.target.searchFilm.value);
  }

  return (
    <>
      <Form onSubmit={onSubmit} />
      <ul>
        {status === 'resolved' &&
          movies.map(({ title, original_name, id }) => (
            <Suspense key={id} fallback={<Spinner />}>
              <Cards
                title={title}
                originalName={original_name}
                id={id}
                key={id}
              />
            </Suspense>
          ))}
        {status === 'error' && <Error />}
      </ul>
    </>
  );
}

export default MoviesView;
