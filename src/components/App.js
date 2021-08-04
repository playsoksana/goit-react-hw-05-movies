import './App.css';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route exact path="/movies">
              <MoviesView />
            </Route>
            <Route path="/movies/:moviesId">
              <CardView />
            </Route>
            <Route path="/404">
              <NotFind />
            </Route>
            <Redirect to="404" />
          </Switch>
        </div>
      </Suspense>
    </>
  );
}

export default App;
