import React, { useEffect, useContext, useState } from 'react';
import Footer from '../Footer';
import { PostContext } from '../PostContext';
import { Box, Typography, Grid } from '@material-ui/core';
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
  const { postsData,refresh ,sidebar } = useContext(PostContext);
  const [articles, setArticles] = postsData;
  const classes = useStyles();
  const { mainMargin } = classes;
// 

  return (
    <Box mt={10} justif='center'>
        <Typography color='textSecondary' align='center' variant='subtitle1'>
          Here You can find Last {articles.length} Articles
        </Typography>
      <Box mt={12}>
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
      <Footer
        social={sidebar.social}
        title='Footer'
        description='Something here to give the footer a purpose!'
      />
    </Box>
  );
};

export default Articles;


/*

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptas commodi accusantium repudiandae facilis porro reprehenderit officiis sequi veritatis amet, maiores unde autem exercitationem sint debitis, dolores provident nesciunt dolor explicabo eligendi ipsum, nobis modi culpa. Illum corporis libero, distinctio reiciendis quae fuga! Quod doloribus recusandae, nihil facilis doloremque dolorem!

*/
