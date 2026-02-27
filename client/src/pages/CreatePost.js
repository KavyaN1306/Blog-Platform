import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api";

function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      navigate("/");
    } catch (err) {
      setError("Failed to create post");
    }
  };

  return (
    <div className="container">
      <h2>Create New Post</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <label>Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Content</label>
          <textarea
            rows="6"
            placeholder="Write your post here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;