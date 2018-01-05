import React from 'react';
import { Container } from 'reactstrap';

export default props => {
  return (
    <Container className="mt-4 ml-4">
      <h4>Total Value of Portfolio: $<br />
      Percent change: %</h4>
    </Container>
  );
};