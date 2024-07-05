import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button } from '@mui/material';

const PostForm = ({ addPost, selectedPost, updatePost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPost) {
      updatePost(selectedPost.id, { title, content });
    } else {
      addPost({ title, content });
    }
    setTitle('');
    setContent('');
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Content"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
          {selectedPost ? 'Update Post' : 'Add Post'}
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;
