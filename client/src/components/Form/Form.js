import React from "react";
import { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile")); //getting the logged in user
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : 0
  ); //if current id exists then a single post will be returned having same id for editin purpose

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please <Link to="/auth">Sign In</Link> to Create Your Own Memories and
          Like Other's Memories
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? `Editing` : `Creating`} a Memory
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            minRows={2}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({
                ...postData,
                tags: e.target.value.trim().split(","),
              })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
