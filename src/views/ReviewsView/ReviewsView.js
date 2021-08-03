import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchByIdMoviesReviews } from '../../helpers/api';
import Error from '../../components/Errors/Errors';
import styles from './ReviewsView.module.css';

function ReviewsView() {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState({ author: null, content: null });
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        const reviewsData = await fetchByIdMoviesReviews(moviesId);

        if (reviewsData.total_results === 0) {
          throw new Error('error reviews');
        }
        const reviews = reviewsData.results.map(({ author, content }) => ({
          author,
          content,
        }));

        setReviews(reviews);
        setStatus('resolved');
      } catch (error) {
        setStatus('error');
      }
    })();
  }, [moviesId]);

  return (
    <>
      {status === 'resolved' && (
        <ul>
          {reviews.map(({ author, content }, index) => (
            <li key={index}>
              <p className={styles.Autor}> Author: {author} </p>
              <p> {content}</p>
            </li>
          ))}
        </ul>
      )}
      {status === 'error' && <Error />}
    </>
  );
}

export default ReviewsView;
