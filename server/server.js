const express = require('express');
const cors = require('cors');
const { sequelize, Post, Models } = require('./models');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ test: 'test' });
});

app.get('/posts', async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const newPost = await Post.create({ title: req.body.title, content: req.body.content });
  res.json(newPost);
});

app.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.destroy({
      where: {
        id: postId,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
