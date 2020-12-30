import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  useHistory,
} from 'react-router-dom';
import './App.css';
import { PostProvider } from './components/PostContext';

// Importing Pages
import Home from './components/views/Home';
import Articles from './components/views/Articles';
import NewArticle from './components/views/NewArticle';
import DisplayArticle from './components/views/DisplayArticle';
import Navbar from './components/AppBar';

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



const App = () =>
{
  const linkList = [
    {
      text: 'Home',
      icon: <HomeTwoTone />,
      route: '/',
    },
    {
      text: 'Create',
      icon: <FiberNewTwoTone />,
      route: '/NewArticle',
    },
    {
      text: 'All Articles',
      icon: <Subject />,
      route: '/Articles',
    },
  ];
  return (
    <React.Fragment>
      <Router basename='/'>
        <Switch>
          <PostProvider>
            <Navbar title='Making The History Here' linkList={linkList} />
            <Route path='/' exact component={Home}  />
            <Route path='/Articles' exact component={Articles} />
            <Route path='/NewArticle' exact component={NewArticle} />
            <Route path='/Articles/:id' component={DisplayArticle} />
          </PostProvider>
        </Switch>
      </Router>
    </React.Fragment>
  );
}
export default App;
