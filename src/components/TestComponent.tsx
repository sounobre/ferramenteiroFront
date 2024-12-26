import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';

const TestComponent: React.FC = () => {
  return (
    <Link href="/test" passHref>
      <ListItem component="a" button>
        <ListItemText primary="Test Link" />
      </ListItem>
    </Link>
  );
};

export default TestComponent;