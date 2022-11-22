import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts); //posts because in reducers it is export default combineReducers({posts});
  const classes = useStyles();

  if(!posts.length && !isLoading) return 'No Posts';
  if(posts.length > 6) return <CircularProgress/>  //sometimes more than 6 posts are being fetched and displayed in the beginning

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
