import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import AddBuyOrder from './components/AddBuyOrder.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinList: []
    };
  }

  componentWillMount() {
    this.getListOfCoins();
  }

  render() {
    return (
      <Container>
        <h1>crypto-portfolio</h1>
        <AddBuyOrder coinList={this.state.coinList} addToPortfolio={buy => this.postBuyToServer(buy)} />
      </Container>
    );
  }

  getListOfCoins() {
    fetch('/server/getCoinList')
      .then(resp => resp.json())
      .then(data => this.setState({coinList: data}))
      .catch(console.error);
  }

  postBuyToServer({coin, amount, price}) {
    console.log(`adding ${amount} ${coin} at value of $${price}`);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));