import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {

    if (page) {
      dispatch(getPosts(page));
    }
     // eslint-disable-next-line
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
