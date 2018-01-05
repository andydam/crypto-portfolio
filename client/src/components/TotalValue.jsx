import React from 'react';
import { Container, Fade, ListGroupItem} from 'reactstrap';

export default ({stats}) => {
  return (
    <Container className="mt-4">
      <ListGroupItem color={stats.percentChange ? Number(stats.percentChange) > 0 ? 'success' : 'danger' : ''}>
        <h4>Starting Value: ${stats.startingValue || 0}<br />
        Current Value: ${stats.currentValue || 0}<br />
        Change: {stats.percentChange || 0}%</h4>
      </ListGroupItem>
    </Container>
  );
};