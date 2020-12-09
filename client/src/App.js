import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import { PostProvider } from './components/PostContext';
// Importing Pages
import Home from './layouts/Home';
import NewArticle from './layouts/NewArticle';
import Articles from './layouts/Articles';
import DisplayArticle from './layouts/DisplayArticle';

function App() {
  return (
    <Router>
      <PostProvider>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Articles' exact component={Articles} />
          <Route path='/NewArticle' exact component={NewArticle} />
          <Route path='/Articles/:id' component={DisplayArticle} />
        </Switch>
      </PostProvider>
    </Router>
  );
}

function Footer() {
  return (
    <footer
      className='mt-5 footer '
      style={{
        height: '50px',
        background: '#999',
        position: 'fixed',
        width: '100%',
        left: '0',
        bottom: '0',
        padding: '50px 0 0 0 ',
      }}
    ></footer>
  );
}

export default App;
