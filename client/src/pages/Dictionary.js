import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { DictionaryList } from '../components/DictionaryList';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { useToast } from '../hooks/toast.hook';
import { prepareDictionaryList } from '../utils';

export const Dictionary = () => {
  const auth = useContext(AuthContext);
  const toast = useToast();
  const {loading, error, request, clearErrors} = useHttp();
  const [dictionary, setDictionary] = useState({ list: {} });

  const getDictionary = useCallback(async () => {
    try {
      const response = await request('/api/dictionary/', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      });

      console.log('dictionary res:', response);
      
      setDictionary({ list: prepareDictionaryList(response) });
    } catch (err) {
      console.error(err);
    }
  }, [auth, request]);
  
  // OnInit
  useEffect(() => {
    getDictionary();
  }, [getDictionary]);

  useEffect(() => {
    toast(error, 'error');
    clearErrors();
  }, [error, toast, clearErrors]);

  return (
    <div>
      <Navbar title="Dictionary" />
      <DictionaryList dictionary={dictionary}></DictionaryList>

      <div className="fixed-action-btn">
        <div className="btn-floating btn-large red">
          <NavLink to="/dictionary/create" disabled={loading}>
            <i className="large material-icons">library_add</i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
