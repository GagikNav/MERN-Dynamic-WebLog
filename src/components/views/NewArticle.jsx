import React, { useContext } from 'react';
import InputForm from '../InputForm';
import Footer from '../Footer';
import { PostContext } from '../PostContext';
import { Container, Box, Typography } from '@material-ui/core';
const NewArticle = () => {
  const { sidebar } = useContext(PostContext);
  return (
    <>
      <Container fixed maxWidth={'sm'}>
        <Box mt={10} ml={5}>
          <Typography variant='h5' color='initial'>
            NewArticle
          </Typography>
        </Box>
        <InputForm />
      </Container>
      <Footer
        social={sidebar.social}
        title='Footer'
        description='Something here to give the footer a purpose!'
      />
    </>
  );
};

export default NewArticle;
