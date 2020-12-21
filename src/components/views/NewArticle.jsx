import React from 'react';
import InputForm from '../InputForm';

import { Container, Box, Typography } from '@material-ui/core';
const NewArticle = () => {
  return (
    <>
      <Container fixed maxWidth={'sm'}>
        <Box mt={10} ml={5}>
          <Typography variant='h2' color='initial'>
            NewArticle
          </Typography>
        </Box>
        <InputForm />
      </Container>
    </>
  );
};

export default NewArticle;
