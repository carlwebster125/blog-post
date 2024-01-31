import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function CreatePost({ fetchPosts }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please enter both title and content.");
      return;
    }

    var raw = JSON.stringify({
      title: formData.title,
      content: formData.content,
    });

    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
      });

      const newPost = await response.json();
      console.log(newPost);
      fetchPosts();
      event.target.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={createPost}>
      <h2>Create New Post:</h2>
      <TextField
        id="outlined-basic"
        label="Title"
        name="title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
      />
      <br />
      <label>
        Content: <br />
        <textarea
          id="content"
          name="content"
          rows="4"
          cols="50"
          value={formData.content}
          onChange={handleChange}
        />
      </label>
      <div>
        <Button
          type="submit"
          startIcon={<FavoriteBorderIcon />}
          size="small"
          variant="contained"
          color="primary"
          sx={{
            fontSize: "11px",
            padding: "3px", // Adjust padding as needed
            minWidth: "10px", // Adjust minWidth as needed
          }}
        >
          Create Post
        </Button>
      </div>
    </form>
  );
}

export default CreatePost;
