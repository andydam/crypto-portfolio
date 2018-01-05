import React from 'react';
import { Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Button} from 'reactstrap';

export default class AddBuyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectCoinVal: '',
      amountCoinVal: 0,
      costCoinVal: 0
    };
  }

  render() {
    return (
      <Container className="mt-4">
        <FormGroup row>
          <Label for="selectCoin" sm={2}>Select Coin</Label>
          <Col sm={10}>
            <Input type="select" name="selectCoinVal" id="selectCoin" value={this.state.selectCoinVal} onChange={e => this.handleChange(e)} required>
              <option></option>
              {this.props.coinList.map(coin => (<option value={coin.symbol} key={coin.id}>{ coin.fullName }</option>))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="amountCoin" sm={2}>Amount</Label>
          <Col sm={4}>
            <Input type="number" name="amountCoinVal"id="amountCoin" value={this.state.amountCoinVal} onChange={e => this.handleChange(e)} />
          </Col>
          <Label for="costCoin" sm={2}>Cost in USD</Label>
          <Col sm={4}>
            <Input type="number" name="costCoinVal" id="costCoin" value={this.state.costCoinVal} onChange={e => this.handleChange(e)} />
          </Col>
        </FormGroup>
        <Button onClick={e => this.handleSubmit(e)}> Add to Portfolio </Button>
      </Container>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    this.props.addToPortfolio({
      coin: this.state.selectCoinVal,
      amount: this.state.amountCoinVal,
      price: this.state.costCoinVal
    });
  }
}