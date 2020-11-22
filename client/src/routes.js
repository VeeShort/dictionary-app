import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { DictionaryAdd } from './pages/DictionaryAdd';
import { Dictionary } from './pages/Dictionary';
import { Register } from './pages/Register';

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/dictionary" exact>
          <Dictionary />
        </Route>
        <Route path="/dictionary/create" exact>
          <DictionaryAdd />
        </Route>
        <Redirect to="/dictionary" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
