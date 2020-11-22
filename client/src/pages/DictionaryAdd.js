import { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from '../components/Input';
import { Navbar } from '../components/Navbar';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { useToast } from '../hooks/toast.hook';

export const DictionaryAdd = () => {
  const auth = useContext(AuthContext);
  const toast = useToast();
  const {loading, error, request, clearErrors} = useHttp();
  const [form, setForm] = useState({
    en: '', translation: '',
  });
  const enInput = useRef('');
  const transInput = useRef('');

  useEffect(() => {
    toast(error, 'error');
    clearErrors();
  }, [error, toast, clearErrors]);
  
  const changeHandler = ({target}) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const clearInputs = () => {
    enInput.value = '';
    transInput.value = '';
  }

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await request('/api/dictionary/create', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      });
      toast(response.message);
      clearInputs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar title="Dictionary" />
      <div className="container" style={{marginTop: '100px'}}>
        <div className="row">
          <div className="row">
            <Input
              ref={enInput}
              name="en"
              type="text"
              placeholder="Word"
              change={changeHandler}
              isDisabled={loading}
            />
            <Input 
              ref={transInput}
              name="translation"
              type="text"
              placeholder="Translation"
              change={changeHandler}
              isDisabled={loading}
            />
          </div>
          <div className="row center">
            <button
              className="waves-effect waves-light btn-large"
              onClick={createHandler}
              disabled={loading}
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <div className="fixed-action-btn">
        <div className="btn-floating btn-large red">
          <NavLink to="/dictionary" disabled={loading}>
            <i className="large material-icons">arrow_back</i>
          </NavLink>
        </div>
      </div>

    </div>
  );
}
