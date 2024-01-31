import { useState, useEffect } from "react";
import "./App.css";
import CreatePost from "./components/CreatePost";
import DeletePost from "./components/DeletePost";
import GetPokeData from "./components/GetPokeData";

function App() {
  const [blogPosts, updateBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/posts', { method: 'GET' });
      const posts = await response.json();

      console.log(posts);
      updateBlogPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Post with ID ${postId} deleted`);
        fetchPosts();
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        blogPosts.map((post, index) => (
          <div key={post.id} className="post-container">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {blogPosts.length > 0 && (
              <div className="post-number">{index + 1}</div>
            )}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))
      )}

      <div>
        <CreatePost fetchPosts={fetchPosts} />
        </div>
      <GetPokeData />
      </div>
  );
}

export default App;
