import timeAgo from "lib/timeago";

const Comment = ({ comment }) => {
  return (
    <div className=" mt-6">
      <p>
        {comment.author.name} {timeAgo.format(new Date(comment.createdAt))}
      </p>
      <p>{comment.content}</p>
    </div>
  );
};

export default function Comments({ comments }) {
  if (!comments) {
    return null;
  }

  return (
    <>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </>
  );
}
