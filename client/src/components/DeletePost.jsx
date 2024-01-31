function DeletePost({ postId, fetchPosts }) {
  const deletePost = async () => {
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

  return <button  onClick={deletePost}>Delete</button>;
}

export default DeletePost;
