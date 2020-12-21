import axios from 'axios';
import React, { useState, useContext, useRef } from 'react';
import { PostContext } from '../components/PostContext';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import useForm from './useForm';
import validate from './ValidateInput';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {
  TextField,
  FormControl,
  Button,
  Icon,
  Typography,
  Modal,
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { palette } from '@material-ui/system';

// Main Function
const InputForm = withRouter(({ history, article, match }) => {
  //
  const [consent, setConsent] = useState(false);
  const { refresh } = useContext(PostContext);
  const [shouldGetData, setShouldGetData] = refresh;

  // useForm Hook

  const {
    handelChange,
    handleCancel,
    handleSubmit,
    values,
    errors,
    handleSave,
  } = useForm(submit, validate, article, consent, setConsent);

  // Functions

  const redirect = path => {
    history.push(path);
  };

  function submit(isEdit) {
    //isEdit os from useForm to determine keeping values of the form
    if (isEdit === true) {
      console.log(isEdit);
      editData(match.params.id);
      getLastData();
      setShouldGetData(!shouldGetData);
      redirect('/Articles');
    } else {
      sendData();
      getLastData();
      setShouldGetData(!shouldGetData);
      redirect('/Articles');
    }
  }
  // Function for Sending Data to database

  const sendData = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/posts',
        //'https://mern-blog-298121.ew.r.appspot.com/api/posts/',
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
    // `http://mern-blog-298121.ew.r.appspot.com/api/posts/${ id }`;
    try {
      const res = await axios({
        method: 'patch',
        url: address, //`api/posts/${id}`,
        data: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
      const resStatus = await res.status;
      return resStatus;
    } catch (err) {
      console.error(err);
    }
  };

  // Getting last saved data

  const getLastData = async () => {
    try {
      const res = await axios.get(
        //'https://mern-blog-298121.ew.r.appspot.com/api/posts/lts',
        `http://localhost:5000/api/posts/lts`,
      );
      let id = res.data[0]._id;
      // Redirecting to create weblog
      redirect(`/Articles/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  // destructuring inPuts
  let { name, postBody, postTitle } = values;
  //
  //  Styling Css
  const click = e => {
    handleSubmit();
  };
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(2),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    markDown: {
      display: 'block',
      width: '100%',
      margin: '15px',
      background: 'Gainsboro',
      borderBottom: 'black 1px solid',
      borderRadius: '5px 5px 0 0',
      minHeight: 250,
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: blue[100],
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 2, 2, 5),
      height: 150,
      zIndex: 10,
      bottom: '30%',
      left: '20%',
      borderRadius: 5,
    },
    modalYesBtn: {
      margin: theme.spacing(2),
    },
    modalNoBtn: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  //Render
  return (
    <div>
      <form noValidate autoComplete='off'>
        <FormControl className={classes.root}>
          <TextField
            size='small'
            error={errors.name}
            helperText={errors.name && errors.name}
            required
            className={classes.margin}
            label='Name'
            variant='outlined'
            id='name'
            name='name'
            type='text'
            onChange={handelChange}
            value={name || ''}
          />
        </FormControl>

        <FormControl className={classes.root}>
          <TextField
            error={errors.postTitle}
            helperText={errors.postTitle && errors.postTitle}
            required
            className={classes.margin}
            label='Title '
            variant='outlined'
            id='postTitle'
            name='postTitle'
            type='text'
            onChange={handelChange}
            value={postTitle || ''}
          />
        </FormControl>
        <FormControl className={classes.root}>
          <TextField
            error={errors.postBody}
            helperText={errors.postBody && errors.postBody}
            className={classes.margin}
            multiline
            required
            rows={6}
            label='Your Story'
            type='text'
            name='postBody'
            id='postBody'
            placeholder='# Article MarkDown'
            onChange={handelChange}
            variant='filled'
            value={postBody || ''}
          />
        </FormControl>
        {/* Mark Down function */}
        <div className={classes.root}>
          <label htmlFor='markdown' style={{ marginLeft: 20 }}>
            <Typography variant='overline' color='initial'>
              Markdown-Display
            </Typography>
          </label>
          <ReactMarkdown
            id='markdown'
            name='markdown'
            className={classes.markDown}
            source={postBody || ''}
          />
        </div>
        <Button
          className={classes.margin}
          variant='contained'
          color='primary'
          onClick={() => {
            console.log(postTitle);
          }}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          className={classes.margin}
          variant='contained'
          onClick={handleCancel}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        {/* MODAL */}
        <Modal
          open={consent}
          disablePortal
          disableEnforceFocus
          disableAutoFocus
        >
          <div className={classes.paper} style={{}}>
            <Typography
              display='block'
              gutterBottom
              paragraph
              align='left'
              variant='h6'
              color='initial'
            >
              Do you want to Save the post?
            </Typography>
            <Button
              className={classes.modalYesBtn}
              variant='contained'
              type='submit'
              onClick={handleSubmit}
              color={'primary'}
            >
              Yes
            </Button>
            <Button
              className={classes.modalNoBtn}
              variant='contained'
              color={'secondary'}
              onClick={e => {
                setConsent(false);
              }}
            >
              No
            </Button>
          </div>
        </Modal>
      </form>
    </div>
  );
});

export default InputForm;
