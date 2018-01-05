import React from 'react';
import { Col, Container, ListGroupItem } from 'reactstrap';

export default ({order}) => {
  return (
    <ListGroupItem>
      {order[0].amount} {order[0].coin} bought for ${order[0].price}, current value is ${order[1]['PRICE'] * order[0].amount}, {(((order[1]['PRICE'] * order[0].amount) / order[0].price) * 100).toFixed(2)}% change
    </ListGroupItem>
  );
};