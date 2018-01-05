import React from 'react';
import { Col, Container, ListGroupItem } from 'reactstrap';

export default ({order}) => {
  return (
    <ListGroupItem>
      Bought {order.amount}x {order.coin} at ${order.price}
    </ListGroupItem>
  );
};