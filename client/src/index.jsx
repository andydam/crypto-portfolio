import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Container, Modal, ModalHeader, ModalBody, Progress, ModalFooter, Button} from 'reactstrap';
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
      totalStats: {},
      loading: 20,
      errorModal: {
        message: '',
        show: false
      }
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
        <Modal isOpen={this.state.loading === 100 ? false : true}>
          <ModalBody>
            <Progress animated value={`${this.state.loading}`} />
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.errorModal.show}>
          <ModalHeader>
            {this.state.errorModal.message}
          </ModalHeader>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.setState({errorModal: {show: false}})}>Okay</Button>
          </ModalFooter>
        </Modal>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1 className="mt-4">crypto-portfolio</h1>
          <AddBuyOrder coinList={this.state.coinList} addToPortfolio={buy => this.postBuyToServer(buy)} />
          <TotalValue stats={this.state.totalStats}/>
          <OrderList orderList={this.state.orderList} orderStatsList={this.state.orderStatsList} removeBuy={buy => this.removeBuy(buy)}/>
        </Col>
      </Container>
    );
  }

  getListOfCoins() {
    fetch('/server/getCoinList')
      .then(resp => resp.json())
      .then(data => this.setState({coinList: data, loading: this.state.loading + 20}))
      .catch(console.error);
  }

  getListOfOrders() {
    fetch('/server/getOrderList')
      .then(resp => resp.json())
      .then(data => this.setState({orderList: data, loading: this.state.loading + 20}))
      .catch(console.error);
  }

  getListOfOrderStats() {
    fetch('/server/getOrderStatsList')
      .then(resp => resp.json())
      .then(data => this.setState({orderStatsList: data, loading: this.state.loading + 20}))
      .catch(console.error);
  }

  getTotalStats() {
    fetch('/server/getTotalStats')
      .then(resp => resp.json())
      .then(data => this.setState({totalStats: data, loading: this.state.loading + 20}))
      .catch(console.error);
  }

  postBuyToServer(order) {
    if (order.coin === '') {
      this.setState({errorModal: {
        message: 'Please select a coin',
        show: true
      }});
    } else if (order.amount <= 0 || order.amount === '' || Number(order.amount) === NaN) {
      this.setState({errorModal: {
        message: 'Please enter a valid amount',
        show: true
      }});
    } else if (order.price <= 0 || order.price === '' || Number(order.price) === NaN) {
      this.setState({errorModal: {
        message: 'Please enter a valid cost',
        show: true
      }});
    } else {
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
          this.setState({loading: 40});
          this.getListOfOrders();
          this.getTotalStats();
          this.getListOfOrderStats();
        })
        .catch(console.error);
    }
  }

  removeBuy(buy) {
    console.log(`remove order ${buy.id} ${buy.amount} ${buy.coin} at value of $${buy.price}`);
    fetch('/server/removeBuyOrder', {
      method: 'POST',
      body: JSON.stringify(buy),
      headers: {
        'content-type': 'application/json'
      }})
      .then(resp => resp.json())
      .then(() => {
        this.setState({loading: 40});
        this.getListOfOrders();
        this.getTotalStats();
        this.getListOfOrderStats();
      })
      .catch(console.error);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));