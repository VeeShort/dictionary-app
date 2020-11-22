import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../components/Input';
import { useHttp } from '../hooks/http.hook';
import { useToast } from '../hooks/toast.hook';

export const Register = () => {
  const toast = useToast();
  const {loading, error, request, clearErrors} = useHttp();
  const [form, setForm] = useState({
    email: '', password: '', repeat_password: '',
  });

  useEffect(() => {
    toast(error, 'error');
    clearErrors();
  }, [error, toast, clearErrors]);
  
  const changeHandler = ({target}) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const isFormValid = () => {
    const {password, repeat_password, email} = form;
    let isValid = false;

    if (password !== repeat_password) {
      toast('Passwords do not match', 'error');
    } else if (!email || !password || !repeat_password) {
      toast('Fill all the fields', 'error');
    } else {
      isValid = true;
    }

    return isValid;
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid()) { return false; }
    try {
      const response = await request('/api/auth/register', 'POST',
        {
          email: form.email,
          password: form.password,
        }
      );
      toast(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="header center">Create new account</h3>
      </div>
      <div className="row">
        <form className="col s12">
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
            <Input 
              name="repeat_password"
              type="password"
              placeholder="Repeat password"
              change={changeHandler}
              isDisabled={loading}
            />
          </div>
          <div className="row">
            <div className="col s12">
              <NavLink to="/auth">I already have an account</NavLink>
            </div>
          </div>
        </form>
        <div className="row center">
          <button
            className="waves-effect waves-light btn-large orange"
            disabled={loading}
            onClick={registerHandler}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
