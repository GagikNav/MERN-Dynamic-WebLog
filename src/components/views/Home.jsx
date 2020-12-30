import React, { useContext } from 'react';
import MainFeaturedPost from '../MainFeaturedPost';
import FeaturedPost from '../FeaturedPost';
import Footer from '../Footer';
import { PostContext } from '../PostContext';
//
import post1 from '../templates/blog-post.1.md';
import post2 from '../templates/blog-post.2.md';
import post3 from '../templates/blog-post.3.md';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { Container, Typography, Box, Card } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'This is a blog interacting with database',
  description:
    'To create, delete and edit please click on menu button.\n The cards below are not functional.\nThis is a simple MERN stack blog and the main objective was experiment interaction with mongodb data base not the styling but MATERIAL-UI has been used.',
  image: 'https://source.unsplash.com/azedtu7j_3E',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/69FOA_ujBk4',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/AeKWNaYNDk0',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];

/*
Todo: fix home cards, 
Todo: add footer to context, 
*/
export default function Home() {
  const { sidebar } = useContext(PostContext);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Container
        maxWidth='lg'
        style={{ minHeight: 'calc(100vh - 120px - 10px)' }}
      >
        <Box mt={20}>
          <CssBaseline />
          <MainFeaturedPost post={mainFeaturedPost} />
          {/* The rest of your application */}
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}></Grid>
        </Box>
      </Container>
      <Footer
        social={sidebar.social}
        title='Footer'
        description='Something here to give the footer a purpose!'
      />
    </React.Fragment>
  );
}
