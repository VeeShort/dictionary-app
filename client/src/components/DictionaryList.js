import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export const DictionaryList = ({ dictionary }) => {
  const classes = useStyles();
  console.log(dictionary.list);

  return (
    <List className={classes.root} subheader={<li />}>
      {Object.entries(dictionary.list).map((pair, index) => (
        <li key={`section-${index}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{pair[0]}</ListSubheader>
            {pair[1].map(({en, translation}) => (
              <ListItem key={`item-${pair[0] + en}`} divider>
                <ListItemText primary={en} secondary={translation}/>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export default DictionaryList;
