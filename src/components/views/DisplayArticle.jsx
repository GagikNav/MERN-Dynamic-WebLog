import React, { useState, useEffect, useContext, useRef } from 'react';
import { PostContext } from '../PostContext';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import InputForm from '../InputForm';
import Footer from '../Footer';

// MUI imports
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {
  Box,
  Modal,
  Container,
  Button,
  Typography,
  Grid,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  marginTop: {
    margin: theme.spacing(10, 'auto'),
  },
  cardClass: {
    height: '35vh',
    objectFit: 'fill',
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
  modalYesBtn: {
    margin: theme.spacing(2),
  },
  btnColor: 'theme.palette.info.main',
}));

const theme = createMuiTheme();
// Main function
const DisplayArticle = ({ history, match }) => {
  const articleId = match.params.id;
  const isFeaturedPost = useRef(articleId.length < 5 ? true : false);

  // useState

  const [article, setArticle] = useState({});
  const [consent, setConsent] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  //  context
  const { postsData, refresh, sidebar } = useContext(PostContext); // getting data from context
  const [shouldGetData, setShouldGetData] = refresh; // this is from context
  const [posts, setPosts] = postsData;

  const [index, setIndex] = useState(11);
  // Functions
  function filterById(obj, findId) {
    return obj.filter(obj => obj._id === findId);
  }
  //
  const getData = async () => {
    console.log('getting data');
    if (isFeaturedPost.current) {
      let data = posts;
      setArticle(data[articleId - 1]);
      setIndex(data[articleId - 1].imgIndex);
    } else {
      try {
        let { data } = await axios.get(
          `https://mern-blog-298121.ew.r.appspot.com/api/posts/${articleId}`
        );
        setArticle(data);
        setIndex(data.imgIndex);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //
  const deleteData = async () => {
    try {
      await axios.delete
        (`https://mern-blog-298121.ew.r.appspot.com/api/posts/${articleId}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  //
  function handleDelete() {
    if (consent) {
      deleteData();
      setShouldGetData(!shouldGetData);
      history.push('/Articles');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
  //
  function handleIsEditMode() {
    setIsEditMode(!isEditMode);
    setConsent(false);
  }
  //  Date function
  function postDate() {
    const dateOfPost = article.date;
    if (dateOfPost) return dateOfPost.slice(0, 10).replace(/-/g, '/');
  }

  // UseEffects
  useEffect(() => {
    getData();
  }, []);
  //

  const classes = useStyles();

  if (!isEditMode) {
    return (
      <>
        <Grid className={classes.marginTop} container xs={10} md={5}>
          <Grid
            justify='center'
            alignItems='center'
            style={{ width: '50%', flexGrow: 1 }}
          >
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.cardClass}
                  component='img'
                  image={`https://picsum.photos/id/${index}/900/500`}
                  title='Card cap'
                />
                <CardContent>
                  <Typography variant='caption' color='initial'>
                    Date: {postDate()}
                  </Typography>
                  <Container style={{ marginTop: '20px' }}>
                    <Typography variant='h4' color='initial'>
                      {article ? article.postTitle : ''}
                    </Typography>
                    <Typography variant='body1' color='initial'>
                      <ReactMarkdown source={article ? article.postBody : ''} />
                    </Typography>
                  </Container>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  disabled={isFeaturedPost.current}
                  color={'primary'}
                  style={{ margin: theme.spacing(1) }}
                  onClick={handleIsEditMode}
                >
                  {!isEditMode ? 'Edit' : 'Go Back'}
                </Button>
                <Button
                  disabled={isFeaturedPost.current || consent}
                  onClick={() => setConsent(!consent)}
                  color='secondary'
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>

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
                Do you want to Delete the post?
              </Typography>
              <Button
                className={classes.modalYesBtn}
                variant='contained'
                type='submit'
                onClick={handleDelete}
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
        </Grid>
        <Footer
          social={sidebar.social}
          title='Footer'
          description='Something here to give the footer a purpose!'
        />
      </>
    );
  } else {
    return (
      <>
        <Container fixed maxWidth={'sm'}>
          <Box mt={10} ml={5}>
            <Typography variant='h2' color='initial'>
              Edit Article
            </Typography>
          </Box>
          <InputForm article={article} edit={isEdit => setIsEditMode(isEdit)} />
          <Button
            style={{ margin: theme.spacing(1, 2) }}
            variant='contained'
            color='default'
            onClick={handleIsEditMode}
          >
            {!isEditMode ? 'Edit' : 'Go Back'}
          </Button>
        </Container>
        <Footer
          social={sidebar.social}
          title='Footer'
          description='Something here to give the footer a purpose!'
        />
      </>
    );
  }
};

export default DisplayArticle;
