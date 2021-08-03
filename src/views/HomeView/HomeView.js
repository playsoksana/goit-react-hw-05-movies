import React, { useEffect, useState, Suspense } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { fetchByTrending } from '../../helpers/api';
import Error from '../../components/Errors/Errors';

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
        console.log(error.message);
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
                <Link to={`/goit-react-hw-05-movies/movies/${card.id}`}>
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
