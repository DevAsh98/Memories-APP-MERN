import React from 'react';
import { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Grow, Container, Grid, Card, CardMedia, CardContent, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from '../../actions/posts';

import CommentSection from './CommentSection';

const PostDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post, posts, isLoading } = useSelector(state => state.posts);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (post) {

      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })); // whenever post changes get posts with same tags
    }
    // eslint-disable-next-line
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <CircularProgress />

    )
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);  //getting other posts from same user where the fetched posts have same tags


  const openPost = (_id) => navigate(`/post/${_id}`);

  return (
    <Grow in={true}>
      <Container maxWidth="xl" className={classes.gridContainer}>
        <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} >
          <Grid item xs={12} sm={12} md={1}></Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Paper style={{ borderRadius: '5px' }} elevation={6}>
              <div>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
              </div>
              <div className={classes.postDetailsTextPart}>
                <Typography className={classes.createByText} variant='h6'>{post.name}</Typography>
                <Typography className={classes.createOnText} variant='caption'>Created on {moment(post.createdAt).format('DD MMM')}</Typography>
                <Typography className={classes.PostTitle} variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p" className={classes.PostMessage}>{post.message}</Typography>
              </div>
              <Divider />
              <CommentSection post={post} />

            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Paper style={{ borderRadius: '5px' }} elevation={1}>
              <Typography className={classes.recommndationTitle} variant='h6' component='h2' color='primary'>Recommended For You</Typography>
              <Grid container className={classes.recoPostContainer} direction="column" spacing={3}>
                {recommendedPosts.map((post, i) => (
                  <Grid item key={i} style={{ cursor: 'pointer' }} onClick={() => openPost(post._id)}>
                    <Card className={classes.recoCards}>
                      <CardMedia>
                        <img className={classes.cardMediaImg} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                      </CardMedia>
                      <div className={classes.recoPostDetails}>
                        <CardContent className={classes.recoPostContent}>
                          <Typography component="p" variant="body2" style={{ fontWeight: 'bold', marginTop: '-15px' }}>{post.title}</Typography>
                          <Typography style={{ fontSize: '13px', opacity: '0.8' }}>By: {post.name}</Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </Grow>
  )
}

export default PostDetails;