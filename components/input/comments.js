import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    fetch('/api/comments/' + eventId)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function addCommentHandler(commentData) {
    const reqBody = {
      eventId: eventId,
      email: commentData.email,
      name: commentData.name,
      comment: commentData.text,
    };

    fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCommentsData(data.comments));
  }

  console.log(commentsData.email);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && (
        <NewComment eventId={eventId} onAddComment={addCommentHandler} />
      )}
      {showComments && <CommentList comments={commentsData}/>}
    </section>
  );
}

export default Comments;
