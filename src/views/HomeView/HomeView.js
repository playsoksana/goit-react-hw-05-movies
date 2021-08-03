import React, { useEffect, useState, lazy, Suspense } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { fetchByTrending } from '../../helpers/api';
import NotFind from '../../components/NotFind/NotFind';

const Error = lazy(() =>
  import(`../../components/Errors/Errors` /*webpackChunkName: 'Errors*/),
);

function HomeView() {
  const [listTrendingMovies, setListTrendingMovies] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        const objectTrendingMovies = await fetchByTrending();
        setListTrendingMovies(objectTrendingMovies.results);
        if (listTrendingMovies) {
          throw new Error('error Trending');
        }
        setStatus('resolved');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, []);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        {status === 'resolved' && (
          <ul>
            {listTrendingMovies.map(card => (
              <li key={card.id}>
                <Link to={`/movies/${card.id}`}>
                  {card.title ?? card.original_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {status === 'error' && <Error />}
      </Suspense>
    </>
  );
}

export default HomeView;
