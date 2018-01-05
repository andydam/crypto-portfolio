import React from 'react';
import { Col, Container, ListGroupItem, Button } from 'reactstrap';

export default ({order, stats, removeBuy}) => {
  return (
    <ListGroupItem color={stats ? Number(stats.percentChange) > 0 ? 'success' : 'danger' : ''}>
      <span>{order.amount} {order.coin} purchased for ${order.price.toFixed(2)} total {stats ? 
        (`- Current value is $${stats.currentValue} - ${stats.percentChange}% change`) : ('')}</span>
      <Button className="affix float-right" color="danger" onClick={() => removeBuy(order)}>x</Button>
    </ListGroupItem>
  );
};