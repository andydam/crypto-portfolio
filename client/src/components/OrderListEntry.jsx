import React from 'react';
import { Col, Container, ListGroupItem } from 'reactstrap';

export default ({order, stats}) => {
  return (
    <ListGroupItem color={stats ? Number(stats.percentChange) > 0 ? 'success' : 'danger' : ''}>
      {order.amount} {order.coin} purchased for ${order.price.toFixed(2)} total {stats ? 
        (`- Current value is $${stats.currentValue} - ${stats.percentChange}% change`) : ('')}
    </ListGroupItem>
  );
};