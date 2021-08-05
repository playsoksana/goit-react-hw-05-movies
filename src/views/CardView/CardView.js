import { useEffect, useState, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useParams } from 'react-router';

import { fetchByIdMovies } from '../../helpers/api';
import Error from '../../components/Errors/Errors';
import styles from './CardView.module.css';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
const CastView = lazy(() =>
  import(`../CastView` /*webpackChunkName: "CastView "*/),
);
const ReviewsView = lazy(() =>
  import(`../ReviewsView` /*webpackChunkName: "ReviewsView "*/),
);

function CardView() {
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();

  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        const dataMovie = await fetchByIdMovies(moviesId);

        const genresMovie = await dataMovie.genres
          .map(({ name }) => name)
          .join(', ');
        setState({ ...dataMovie, genresMovie });
        setStatus('resolved');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, [moviesId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {location.pathname !== '/' && <Button onGoBack={onGoBack}>BACK</Button>}
      <div className={styles.Container}>
        {' '}
        {status === 'resolved' && (
          <article>
            <div className={styles.Cover}>
              <img
                className={styles.Image}
                src={`https://image.tmdb.org/t/p/w500/${state.poster_path}`}
                alt={state.title ? state.title : state.original_name}
              ></img>
              <div className={styles.Description}>
                <h2 className={styles.Name}>
                  {state.title ? state.title : state.original_name} (
                  {state.release_date.slice(0, 4)})
                </h2>
                <p className={styles.Title}>
                  User Score:{' '}
                  {state.vote_average
                    ? state.vote_average
                    : 'no user score  yet'}
                </p>
                <p className={styles.Title}>
                  Description{' '}
                  {state.overview ? state.overview : 'no description  yet'}
                </p>
                <p className={styles.Title}>Genres: {state.genresMovie} </p>
              </div>
            </div>

            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      from: location?.state?.from ?? `/`,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      from: location?.state?.from ?? `/`,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense fallback={<Spinner />}>
              <Route path={`${path}/cast`}>
                <CastView />
              </Route>

              <Route path={`${path}/reviews`}>
                <ReviewsView />
              </Route>
            </Suspense>
          </article>
        )}
        {status === 'error' && <Error />}
      </div>
    </>
  );
}

export default CardView;
