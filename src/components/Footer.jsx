import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link, Grid, Box } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://gagik.me'>
        Gagik.me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    borderTop: '1px solid #4d4d4d36',
    background: 'transparent',
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    width: '100%',
    height: '120px',
  },
}));

function Footer(props) {
  const classes = useStyles();
  const { description, title, social } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth='lg'>
        <Grid container direction='row' spacing={1} justify='center' xs={12}>
          {social.map(network => (
            <Link
              style={{ margin: 10, color: 'gray' }}
              display='block'
              variant='body1'
              target='blank'
              href={network.linkTo}
              key={network.name}
            >
              <Grid container direction='row' spacing={0} alignItems='center'>
                <Grid item>
                  <network.icon />
                </Grid>
                <Grid item>{network.name}</Grid>
              </Grid>
            </Link>
          ))}
        </Grid>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
