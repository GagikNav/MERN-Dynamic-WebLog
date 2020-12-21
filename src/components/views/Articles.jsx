import React, { useEffect, useContext } from 'react';
import { PostContext } from '../PostContext';
import { Box, Typography, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
//Importing  Components
import Article from '../Article';

const useStyles = makeStyles(() => ({
  mainMargin: {
    margin: '0 10px 0 10px',
  },
}));

const Articles = () => {
  // Functions
  const { postsData, refresh } = useContext(PostContext);
  const [articles, setArticles] = postsData;
  const classes = useStyles();
  const { mainMargin } = classes;
  // UseEffects
  useEffect(() => {
    // console.log('hello');
    // console.log(articles);
    // console.log(posts);
  }, []);

  return (
    <>
      <Box mt={12}>
        <Typography color='textSecondary' align='center' variant='h5'>
          Here You can find Last {articles.length} Articles
        </Typography>
      </Box>
      <Grid container justify='center' alignItems='center' spacing={2}>
        {articles.map(article => {
          return (
            <Grid
              className={mainMargin}
              item
              xs={10}
              md={4}
              direction='row'
              justify='space-evenly'
              alignItems='stretch'
            >
              <Article key={article._id} article={article} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Articles;
