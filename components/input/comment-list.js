import classes from './comment-list.module.css';

function CommentList(props) {
  const comments = props.comments;

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.comment}</p>
          <div>
            By <address>{comment.email}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
