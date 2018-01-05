import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import OrderListEntry from './OrderListEntry.jsx';

export default ({orderList}) => {
  return (
    <Container className="mt-4 ml-4">
      <ListGroup>
        {orderList.map(order => (<OrderListEntry order={order} key={order[0].id} />))}
      </ListGroup>
    </Container>
  );
};