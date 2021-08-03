import { useEffect, useState } from 'react';
import { Link, useRouteMatch, Route } from 'react-router-dom';
import { useParams } from 'react-router';
import CastView from '../CastView';
import ReviewsView from '../ReviewsView';
import { fetchByIdMovies } from '../../helpers/api';
import Error from '../../components/Errors/Errors';

function CardView() {
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();

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

  return (
    <>
      {' '}
      {status === 'resolved' && (
        <article>
          <h2>{state.title ? state.title : state.original_name}</h2>
          <p>{state.release_date.slice(0, 4)}</p>

          <img
            src={`https://image.tmdb.org/t/p/w500/${state.poster_path}`}
            alt={state.title ? state.title : state.original_name}
          ></img>
          <p>
            User Score:{' '}
            {state.vote_average ? state.vote_average : 'no user score  yet'}
          </p>
          <p>
            Description{' '}
            {state.overview ? state.overview : 'no description  yet'}
          </p>
          <p>Genres: {state.genresMovie} </p>

          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to={`${url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${url}/reviews`}>Reviews</Link>
            </li>
          </ul>

          <Route path={`${path}/cast`}>
            <CastView />
          </Route>

          <Route path={`${path}/reviews`}>
            <ReviewsView />
          </Route>
        </article>
      )}
      {status === 'error' && <Error />}
    </>
  );
}
export default CardView;
