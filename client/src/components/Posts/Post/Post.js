import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import {
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActions,
  Card,
  ButtonBase,
} from "@material-ui/core";
import ThumbUPAltIcon from "@material-ui/icons/ThumbUpAlt";
// import import ThumbUp
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile")); //getting the logged in user

  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId); //boolean=> has user already liked?

  const handleLike = () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId)); //on click unlike as already liked
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUPAltIcon fontSize="small"/>
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => navigate(`/post/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      {/* post details on click */}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && ( //if the creator is currently loggedin user
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <EditIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <Typography className={classes.title} variant="h6" gutterBottom>
          {post.title}
        </Typography>
      </ButtonBase>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          {post.message.length > 60
            ? post.message.substring(0, 60) + "..." 
            : post.message}
            {post.message.length > 60 && <Button onClick={openPost} color="secondary">Read More</Button>}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user?.result} //if user not logged in
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && ( //if the current post is created by the logged in user then deleting abilty
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" color="secondary" />
            <Typography variant="body2" color="secondary">
              Delete
            </Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
