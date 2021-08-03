import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

const Header = lazy(() =>
  import(`./Header` /* webpackChunkName: "HeaderView"*/),
);
const HomeView = lazy(() =>
  import(`../views/HomeView` /* webpackChunkName: "HeaderView"*/),
);
const MoviesView = lazy(() =>
  import(`../views/MoviesView` /* webpackChunkName: "HeaderView"*/),
);
const CardView = lazy(() =>
  import(`../views/CardView` /* webpackChunkName: "HeaderView"*/),
);
const NotFind = lazy(() =>
  import(`./NotFind` /* webpackChunkName: "HeaderView"*/),
);

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header />
        <Switch>
          <Route path="/" exact>
            {' '}
            <HomeView />
          </Route>
          <Route path="/movies" exact>
            {' '}
            <MoviesView />
          </Route>
          <Route path="/movies/:moviesId">
            <CardView />
          </Route>
          <Route>
            <NotFind />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
