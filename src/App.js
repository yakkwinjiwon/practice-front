import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async (post) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts`, post);
      setPosts([...posts, { ...post, id: response.data }]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts/${id}`, updatedPost);
      setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Post Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <PostForm addPost={addPost} selectedPost={selectedPost} updatePost={updatePost} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h6">Posts</Typography>
            <PostList
              posts={posts}
              onUpdate={updatePost}
              onDelete={deletePost}
              onSelect={setSelectedPost}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
