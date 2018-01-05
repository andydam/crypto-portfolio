import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import OrderListEntry from './OrderListEntry.jsx';

export default ({orderList, orderStatsList}) => {
  return (
    <Container className="mt-4 ml-4">
      <ListGroup>
        {orderList.map((order, i) => (<OrderListEntry order={order} stats={orderStatsList[i]} key={order.id} />))}
      </ListGroup>
    </Container>
  );
};