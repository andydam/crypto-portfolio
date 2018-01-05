import React from 'react';
import { Container, Fade, ListGroupItem} from 'reactstrap';

export default ({stats}) => {
  return (
    <Container className="mt-4 ml-4">
      <ListGroupItem color={stats.percentChange ? Number(stats.percentChange) > 0 ? 'success' : 'danger' : ''}>
        <h4>Starting Value: ${stats.startingValue}<br />
        Current Value: ${stats.currentValue}<br />
        Change: {stats.percentChange}%</h4>
      </ListGroupItem>
    </Container>
  );
};