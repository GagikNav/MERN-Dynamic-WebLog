import { React, Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Drawer from './Drawer';

// Material Ui Imports
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  Container,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import {
  HomeTwoTone,
  FiberNewTwoTone,
  Subject,
  LocationOn as LocationOnIcon,
  Favorite as FavoriteIcon,
  Restore as RestoreIcon,
  Folder as FolderIcon,
} from '@material-ui/icons';

//

// Functions Section
const handleClick = () => {
  console.log('menu Click');
};

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles(theme => ({
  navBtn: {
    color: 'white',
  },
  linkContainer: {
    padding: '0 0 0 50px ',
    display: 'flex',
    justifyContent: 'space-around',
    overflowX: 'auto',
  },
}));

//
// Main Component

const Navbar = ({ history, linkList, title }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar position='fixed' className='appBar'>
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              onClick={handleClick}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <Drawer linkList={linkList} />
            </IconButton>
            <Typography
              style={{
                fontFamily: 'dancing script',
              }}
              component='h4'
              variant='h4'
              color='inherit'
              align='center'
              noWrap
            >
              {title}
            </Typography>
            <Typography variant='h3'>{''}</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
};
export default withRouter(Navbar);
