import React from 'react';
import { List, ListItem, ListItemText, Paper, Button } from '@mui/material';

const PostList = ({ posts, onUpdate, onDelete, onSelect }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <ListItem key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Paper style={{ padding: '16px', width: '100%' }}>
            <ListItemText
              primary={post.title}
              secondary={post.content}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSelect(post)}
              style={{ marginRight: '8px' }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </Button>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
