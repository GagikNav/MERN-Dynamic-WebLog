import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar  navbar-expand navbar-dark bg-dark '>
      <Link to='/' className='navbar-brand'>
        React WebLog
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav'>
          <Link to='/' className='nav-item nav-link active'>
            Home <span className='sr-only'>(current)</span>
          </Link>
          <Link to='/NewArticle' className='nav-item nav-link'>
            NewArticle
          </Link>
          <Link to='/Articles' className='nav-item nav-link'>
            Articles
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
