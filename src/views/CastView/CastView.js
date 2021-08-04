import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { fetchByIdMoviesActors } from '../../helpers/api';
import nope from '../../image/nope.jpg';
import Error from '../../components/Errors/Errors';

function Cast() {
  const { moviesId } = useParams();
  const [actors, setActors] = useState([]);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        const actorsData = await fetchByIdMoviesActors(moviesId);
        setActors([...actorsData.cast]);
        console.log(actors);

        if (actors.length === 0) {
          throw new Error('error Actors');
        }
        setStatus('resolved');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, [moviesId, actors.length]);

  return (
    <>
      {status === 'resolved' && (
        <ul>
          {actors.map(({ profile_path, name, character }, index) => (
            <li key={index}>
              <img
                alt={name ? name : nope}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : nope
                }
              ></img>
              <p>Name: {name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
      {status === 'error' && <Error />}
    </>
  );
}

export default Cast;
