import classes from './comment-list.module.css';

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {props.comments.map(comment => <li>{comment.email}</li>)}
    </ul>
  );
}

export default CommentList;
