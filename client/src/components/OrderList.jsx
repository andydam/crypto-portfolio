import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import OrderListEntry from './OrderListEntry.jsx';

export default ({orderList}) => {
  return (
    <Container>
      <ListGroup>
        {orderList.map(order => (<OrderListEntry order={order} key={order.id} />))}
      </ListGroup>
    </Container>
  );
};