import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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

        <div className="section">
          <Switch>
            <Route exact path="/goit-react-hw-05-movies/">
              <HomeView />
            </Route>
            <Route exact path="/goit-react-hw-05-movies/movies">
              <MoviesView />
            </Route>
            <Route path="/goit-react-hw-05-movies/movies/:moviesId">
              <CardView />
            </Route>
            <Route>
              <NotFind />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
