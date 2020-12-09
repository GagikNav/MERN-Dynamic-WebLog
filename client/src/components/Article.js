import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const Article = ({ article, index }) => {
  function postDate() {
    const dateOfPost = article.date;
    if (dateOfPost) return dateOfPost.slice(0, 10).replace(/-/g, '/');
  }
  return (
    <div className='container mt-5'>
      <div className='col-lg p-2'>
        <div className='card  mh-50 '>
          <img
            className='card-img-top m-0'
            src={`https://picsum.photos/500/300?random=${index}`}
            alt='Card cap'
          />
          <div className='card-body '>
            <h6>
              <span>Author: </span>
              {article.name}
            </h6>
            <p className='text-muted '>
              {'Date: '}
              {postDate()}
            </p>
            <h5 className='card-title'>{article.postTitle}</h5>
            <ReactMarkdown
              className='card-text'
              source={article.postBody.slice(0, 10) + '...'}
            />
            <Link to={`/Articles/${article._id}`} className='btn btn-primary'>
              Read More...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
