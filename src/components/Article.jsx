import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import React from 'react';
// MUI
import {
  Typography,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Card,
  CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    minHeight: 500,
  },
  cardContent: {},
});
//

// Main Component

const Article = ({ history, article }) => {
  function postDate() {
    const dateOfPost = article.date;
    if (dateOfPost) {
      return dateOfPost.slice(0, 10).replace(/-/g, '/');
    } else {
      return null;
    }
  }

  const classes = useStyles();
  const { root } = classes;
  return (
    <Card className={root} raised>
      <CardActionArea
        onClick={() => {
          history.push(`/Articles/${article._id}`);
        }}
      >
        <CardMedia
          component='img'
          alt='Card cap'
          image={`https://picsum.photos/id/${article.imgIndex}/700/500`}
          title='Blog Title'
        />
        <CardHeader
          title={
            <Typography
              gutterBottom
              displayBlock
              alignJustify
              variant='h6'
              color='textSecondary'
            >
              {article.postTitle}
            </Typography>
          }
        />
        <CardContent className={'cardContent'} component='div'>
          <Typography gutterBottom variant='subtitle2' color='textPrimary'>
            Author: {article.name}
          </Typography>

          <Typography variant='body2' color='initial'>
            <ReactMarkdown source={article.postBody.slice(0, 85) + '...'} />
          </Typography>
          <Typography gutterBottom variant='subtitle2' color='textSecondary'>
            {'Date: '}
            {postDate()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            history.push(`/Articles/${article._id}`);
            window.location.reload();
          }}
        >
          Read More ...
        </Button>
      </CardActions>
    </Card>
  );
};
export default withRouter(Article);
