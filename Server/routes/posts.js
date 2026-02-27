const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create Post
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user._id,
  });

  res.status(201).json(post);
});

// Get All Posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
  res.json(posts);
});

// Get Single Post
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username");

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.json(post);
});

// Update Post
router.put("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  const updatedPost = await post.save();
  res.json(updatedPost);
});

// Delete Post
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await post.deleteOne();
  res.json({ message: "Post removed" });
});

module.exports = router;