import React from 'react';
import { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post?.comments); //initially the commnts are set
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        // const finalComment = `${user?.result?.name}: ${comment}`;
        const finalComment = {
            comment: comment,
            commentedBy: user?.result?.name,
            commentedOn: new Date().toISOString(),
        };
        const newComments = await dispatch(commentPost(finalComment, post._id)); //commentPost action is returning the data

        setComments(newComments);
        setComment('');

    }

    return (
        <div className={classes.commentSection}>
            <Typography gutterBottom variant="h5">Comments ({comments.length}):</Typography>
            <div className={classes.commentContainer}>

                <TextField
                    fullWidth
                    minRows={2}
                    variant="outlined"
                    label="Add Your Comment"
                    multiline
                    value={comment}
                    // onFocus={setCommentFieldFocused(true)}
                    onChange={(e) => setComment(e.target.value)}
                />
                {comment && (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                        {!user && <Alert severity="error">Please Login to Add Your Comments</Alert>}
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button
                                style={{ marginTop: '10px' }}
                                // fullWidth
                                variant="contained"
                                onClick={handleClick}
                                disabled={!user}
                                color="primary"
                            >
                                Comment
                            </Button>
                            <Button
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                                // fullWidth
                                variant="contained"
                                onClick={() => setComment('')}
                                disabled={!user}
                                color="secondary"
                            >

                                Clear
                            </Button>
                        </div>
                    </div>
                )}
                {comments.map((c, i) => (
                    <Typography className={classes.commentsText} key={i} gutterBottom variant="subtitle1">
                        {!c?.commentedBy && (<div><strong>{c.split(': ')[0]}: </strong>
                            {c.split(': ')[1]}</div>)}
                        {c?.commentedBy && (<div>
                            <strong>{c?.commentedBy}: </strong>
                            {c?.comment}
                        </div>)}

                    </Typography>
                ))}

            </div>
        </div>
    )
}

export default CommentSection;