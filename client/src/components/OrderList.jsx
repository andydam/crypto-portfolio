import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import OrderListEntry from './OrderListEntry.jsx';

export default ({orderList, orderStatsList, removeBuy}) => {
  return (
    <Container className="mt-4">
      <ListGroup>
        {orderList.map((order, i) => (<OrderListEntry order={order} stats={orderStatsList[i]} removeBuy={removeBuy} key={order.id} />))}
      </ListGroup>
    </Container>
  );
};