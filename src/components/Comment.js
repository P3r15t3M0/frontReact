export const Comment = ({ comment }) => {
    return (
        <article>
            <p>usuario {comment.id_user} dijo: {comment.comment}</p>
        </article>
    );
};