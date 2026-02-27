import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>
        {post.content.length > 100
          ? post.content.substring(0, 100) + "..."
          : post.content}
      </p>

      <small>
        Author: {post.author?.username || "Unknown"} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </small>

      <br />
      <br />

      <Link to={`/post/${post._id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default PostCard;