import axios from 'axios';
import React, { useContext, useState } from 'react';
import { PostContext } from '../components/PostContext';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import useForm from './useForm';
import validate from './ValidateInput';
// Main Function

const InputForm = withRouter(({ history, article, match }) => {
  const [consent, setConsent] = useState(false);
  const { refresh } = useContext(PostContext);
  const [shouldGetData, setShouldGetData] = refresh;

  // useForm Hook
  const { handelChange, handleCancel, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    article,
    consent,
    setConsent,
  );
  // Functions

  function submit(isEditMode) {
    if (isEditMode == true) {
      editData(match.params.id);
      getLastData();

      setShouldGetData(!shouldGetData);
    } else {
      sendData();
      getLastData();
      setShouldGetData(!shouldGetData);
    }

    console.log(`submitted ${isEditMode}`);
  }

  // Function for Sending Data to database

  const sendData = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: 'api/posts',
        data: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
      const resStatus = await res.status;
      return resStatus;
    } catch (err) {
      console.error(err.message);
    }
  };

  // Patch request

  const editData = async id => {
    const address = `http://localhost:5000/api/posts/${id}`;
    try {
      const res = await axios({
        method: 'patch',
        url: address, //`api/posts/${id}`,
        data: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(address);
      const resStatus = await res.status;
      return resStatus;
    } catch (err) {
      console.error(err.message);
    }
  };

  // Getting last saved data
  const getLastData = async () => {
    try {
      const res = await axios.get('/api/posts/lts');
      // Redirecting to created weblog
      setTimeout(() => {
        const id = res.data[0]._id;
        history.push(`/Articles/`);
        console.log(history.push);
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };
  // destructuring inPuts
  let { name, postBody, postTitle } = values;
  //Render
  return (
    <div>
      <form noValidate>
        <div className='form-group mt-10'>
          <label htmlFor='name' className='font-weight-bold mt-4'>
            Enter Your Name
          </label>
          <div style={{ color: 'red' }}>
            {errors.name && <small>{errors.name}</small>}
          </div>
          <input
            type='text'
            className='form-control'
            name='name'
            id='name'
            placeholder='Name'
            onChange={handelChange}
            value={name || ''}
            required
          />
          <label htmlFor='postTitle' className='font-weight-bold mt-4'>
            Enter Article's Title
          </label>
          <div style={{ color: 'red' }}>
            {errors.postTitle && <small>{errors.postTitle}</small>}
          </div>
          <input
            type='text'
            name='postTitle'
            className='form-control'
            id='postTitle'
            placeholder='Title of your Article'
            onChange={handelChange}
            value={postTitle || ''}
            required
          />
          <div className='form-row mt-4'>
            <div className='form-group col'>
              <label htmlFor='postBody' className='font-weight-bold mt-4'>
                Markdown
              </label>
              <div style={{ color: 'red' }}>
                {errors.postBody && <small>{errors.postBody}</small>}
              </div>
              <textarea
                type='text'
                name='postBody'
                className='form-group col '
                id='postBody'
                placeholder='# My Article'
                rows='10'
                onChange={handelChange}
                value={postBody || ''}
              ></textarea>
            </div>
            <div className='form-group col-5 col-auto '>
              <label htmlFor='markdown' className='font-weight-bold mt-4'>
                Markdown-Display
              </label>
              <ReactMarkdown
                id='markdown'
                name='markdown'
                className='border h-75'
                source={postBody || ''}
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='btn-lg btn-primary'
          onClick={e => {
            e.preventDefault();
            setConsent(!consent);
          }}
        >
          Save
        </button>
        <button className='btn-lg btn-secondary ml-4' onClick={handleCancel}>
          Cancel
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
              <h5>Do you want to Save the post?</h5>
              <button className='btn btn-danger m-2' onClick={handleSubmit}>
                Yes
              </button>
              <button
                className='btn btn-primary m-2'
                onClick={e => {
                  setConsent(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
});

export default InputForm;
