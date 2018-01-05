import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import AddBuyOrder from './components/AddBuyOrder.jsx';
import OrderList from './components/OrderList.jsx';
import TotalValue from './components/TotalValue.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinList: [],
      orderList: [],
      orderStatsList: [],
      totalStats: {}
    };
  }

  componentWillMount() {
    this.getListOfCoins();
    this.getListOfOrders();
    this.getTotalStats();
    this.getListOfOrderStats();
  }

  render() {
    return (
      <Container>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1>crypto-portfolio</h1>
          <AddBuyOrder coinList={this.state.coinList} addToPortfolio={buy => this.postBuyToServer(buy)} />
          <TotalValue stats={this.state.totalStats}/>
          <OrderList orderList={this.state.orderList} orderStatsList={this.state.orderStatsList}/>
        </Col>
      </Container>
    );
  }

  getListOfCoins() {
    fetch('/server/getCoinList')
      .then(resp => resp.json())
      .then(data => this.setState({coinList: data}))
      .catch(console.error);
  }

  getListOfOrders() {
    fetch('/server/getOrderList')
      .then(resp => resp.json())
      .then(data => this.setState({orderList: data}))
      .catch(console.error);
  }

  getListOfOrderStats() {
    fetch('/server/getOrderStatsList')
      .then(resp => resp.json())
      .then(data => this.setState({orderStatsList: data}))
      .catch(console.error);
  }

  getTotalStats() {
    fetch('/server/getTotalStats')
      .then(resp => resp.json())
      .then(data => this.setState({totalStats: data}))
      .catch(console.error);
  }

  postBuyToServer(order) {
    console.log(`adding ${order.amount} ${order.coin} at value of $${order.price}`);
    fetch('/server/addBuyOrder', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(() => {
        this.getListOfOrders();
        this.getTotalStats();
        this.getListOfOrderStats();
      })
      .catch(console.error);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));