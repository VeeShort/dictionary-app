import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../components/Input';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { useToast } from '../hooks/toast.hook';

export const Auth = () => {
  const auth = useContext(AuthContext);
  const toast = useToast();
  const { loading, error, request, clearErrors } = useHttp();
  const [form, setForm] = useState({
    email: '', password: '',
  });

  useEffect(() => {
    toast(error, 'error');
    clearErrors();
  }, [error, toast, clearErrors]);

  const changeHandler = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    try {
      const { token, userId, message } = await request('/api/auth/login', 'POST', { ...form });
      toast(message);
      auth.signIn(token, userId);
    } catch (err) {
      console.error(err);
      toast(err.message, 'error');
    }
  };

  return (
    <div className="container">
      <h2 className="header center">Sign in</h2>
      <div className="row">
        <div className="row">
          <Input
            name="email"
            type="text"
            placeholder="Email"
            change={changeHandler}
            isDisabled={loading}
          />
          <Input 
            name="password"
            type="password"
            placeholder="Password"
            change={changeHandler}
            isDisabled={loading}
          />
        </div>
        <div className="row">
          <div className="col s12">
            <NavLink to="/register">I haven't got an account yet</NavLink>
          </div>
        </div>
        <div className="row center">
          <button
            className="waves-effect waves-light btn-large"
            onClick={signInHandler}
            disabled={loading}
          >
            Sign in
            </button>
        </div>
      </div>
    </div>
  );
}
