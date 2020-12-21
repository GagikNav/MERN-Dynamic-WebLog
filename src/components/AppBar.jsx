import { React, Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

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
  Menu,
  FiberNewTwoTone,
  Subject,
  LocationOn as LocationOnIcon,
  Favorite as FavoriteIcon,
  Restore as RestoreIcon,
  Folder as FolderIcon,
} from '@material-ui/icons';

//

// Functions Section
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles({
  navBtn: {
    color: 'white',
  },
});

//
// Main Component

const Navbar = ({ history, linkList }) => {
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <Menu />
            </IconButton>

            <Container maxWidth='xs'>
              {linkList.map(link => {
                const { text, icon, route } = link;
                return (
                  <IconButton
                    onClick={() => history.push(`${route}`)}
                    edge='start'
                    color='inherit'
                    aria-label={text}
                  >
                    {icon}
                    <Typography variant='button' color='initial'>
                      {text}
                    </Typography>
                  </IconButton>
                );
              })}
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
};
export default withRouter(Navbar);
