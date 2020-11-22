import { useContext, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { AuthContext } from '../context/auth.context';
import { useHistory } from 'react-router-dom';

export const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const signOut = (event) => {
    event.preventDefault();
    auth.signOut();
    history.push('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuIcon onClick={handleClick}/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}

export default HeaderMenu;
