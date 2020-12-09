import React, { useState, useEffect, useContext } from 'react';
import { PostContext } from '../components/PostContext';

import ReactMarkdown from 'react-markdown';
import InputForm from '../components/InputForm';
import axios from 'axios';

const DisplayArticle = ({ history, match }) => {
  const { refresh } = useContext(PostContext);
  const articleId = match.params.id;
  // useState

  const [article, setArticle] = useState('');
  const [consent, setConsent] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [shouldGetData, setShouldGetData] = refresh; // this is from context

  // Functions
  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${articleId}`);
      setArticle(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteData = async () => {
    try {
      await axios.delete(`/api/posts/${articleId}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  function handleDelete() {
    if (consent) {
      deleteData();
      setShouldGetData(!shouldGetData);
      history.push('/Articles');
    }
  }

  function handleIsEditMode() {
    setConsent(false);
    setIsEditMode(!isEditMode);
  }
  // UseEffects

  useEffect(() => {
    getData();
  }, []);

  function postDate() {
    const dateOfPost = article.date;
    if (dateOfPost) return dateOfPost.slice(0, 10).replace(/-/g, '/');
  }

  if (isEditMode == true) {
    return (
      <div
        style={{
          position: 'relative',
        }}
        className='container mt-4'
      >
        <img
          className='card-img-top m-0'
          src={`https://picsum.photos/500/300`}
          alt='Card cap'
        />
        <h1 className='mt-4'>{article.postTitle}</h1>
        <p className='text-muted '>Date: {postDate()}</p>
        <ReactMarkdown source={article.postBody} />
        <button className='btn-lg btn-info mt-2' onClick={handleIsEditMode}>
          {isEditMode ? 'Edit' : 'Go Back'}
        </button>
        <button
          onClick={() => setConsent(!consent)}
          className={`btn-lg btn-danger m-2 `}
          disabled={consent}
        >
          Delete
        </button>
        {consent ? (
          <div
            className='center bg-light text-center pt-4 pd-2'
            style={{
              height: 150,
              width: 300,
              zIndex: 10,
              position: 'absolute',
              bottom: 20,
              borderRadius: 10,
              boxShadow: '1px 2px 5px 2px gray',
            }}
          >
            <div>
              <h5>Do you want to delete the post?</h5>
              <button className='btn btn-danger m-2' onClick={handleDelete}>
                Yes
              </button>
              <button
                className='btn btn-primary m-2'
                onClick={() => setConsent(false)}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
  return (
    <div className='container'>
      <InputForm article={article} />
      <button className='btn-lg btn-info mt-2' onClick={handleIsEditMode}>
        {isEditMode ? 'Edit' : 'Go Back'}
      </button>
    </div>
  );
};

export default DisplayArticle;
