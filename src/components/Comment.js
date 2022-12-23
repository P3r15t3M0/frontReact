export const Comment = ({ comment }) => {
  return (
    <article>
      <p>
        <b>{comment.alias ? comment.alias : comment.email} dijo: </b>
        {comment.comment}
      </p>
    </article>
  );
};
