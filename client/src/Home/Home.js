import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Grow,
  Grid,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import { getPostsBySearch } from "../actions/posts";
import useStyles from "./styles";
import Paginate from "../components/Pagination/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(""); //serach value

  const [currentId, setCurrentId] = useState(0);
  const [tags, setTags] = useState([]);
  const page = searchParams.get("page") || 1; //getting the page number
  const searchQuery = searchParams.get("searchQuery");
  const tagsFromQuery = searchParams.get("tags");

  useEffect(() => {
    if(searchQuery || tagsFromQuery){
      dispatch(getPostsBySearch({ search: searchQuery, tags: tagsFromQuery }));
    }
    // eslint-disable-next-line
  }, []); //while user goes to a page with search urls

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") })); //joining the tags array by comma
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in={true}>
      <Container maxWidth="xl" className={classes.gridContainer}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories..."
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags..."
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
