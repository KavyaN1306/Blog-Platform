import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post");
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Delete failed");
    }
  };

  if (!post) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <small>
          Author: {post.author.username} |{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </small>

        {user && user._id === post.author._id && (
          <>
            <br /><br />
            <button onClick={() => navigate(`/edit/${post._id}`)}>
              Edit
            </button>{" "}
            <button onClick={handleDelete} style={{ background: "red" }}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SinglePost;