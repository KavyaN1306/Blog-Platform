// function Home() {
//   return (
//     <div className="container">
//       <h2>All Blog Posts</h2>
//     </div>
//   );
// }

// export default Home;
import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get("/posts");
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Latest Blog Posts</h2>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
}

export default Home;