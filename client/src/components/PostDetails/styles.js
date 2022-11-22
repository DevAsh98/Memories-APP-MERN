import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  media: {
    borderRadius: "5px 5px 0 0",
    objectFit: "cover",
    width: "100%",
    maxHeight: "300px",
  },
  postDetailsTextPart: {
    padding: "20px 30px",
  },
  createByText: {
    marginBottom: "-7px",
    fontSize: "22px",
  },
  createOnText: {
    opacity: '0.8'
  },
  PostTitle: {
    paddingTop: "10px",
    fontSize: "40px",
    fontWeight: "Bold"
  },
  PostMessage: {
    paddingTop: "10px"
  },
  

  recommndationTitle: {
    paddingTop: "10px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: 'center',

  },
  recoPostContainer: {
    padding: "10px 5px",
  },
  recoCards: {
    display: "flex",
  },
  cardMediaImg: {
    width: 151,
  },
  recoPostDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  recoPostContent: {
    flex: '1 0 auto',
  },
  commentSection: {
    padding: "20px 30px", 
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: "10px"
  },
  commentsText: {
    padding: "10px"
  }
}));
