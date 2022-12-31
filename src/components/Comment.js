export const Comment = ({ comment }) => {
  return (
    <p>
      <b>{comment.alias ? comment.alias : comment.email} dijo: </b>
      {comment.comment}
    </p>
  );
};
