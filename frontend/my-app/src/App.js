import React, { Component } from 'react';
import {Tab, Tabs, ControlledTabs} from 'react-bootstrap';
import moment from 'moment';
import Gdax from 'gdax';
import './App.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null,
      price: null
    }
    this.websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD']);
    this.websocket.on('message', data => { this.setState({price: data.price}) });
    this.websocket.on('error', err => { /* handle error */ });
    this.websocket.on('close', () => { /* ... */ });
  }
  handleChartHover = (hoverLoc, activePoint) => {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }

  getData = () => {
    const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

    fetch(url).then( r => r.json())
      .then((bitcoinData) => {
        const sortedData = [];
        let count = 0;
        for (let date in bitcoinData.bpi){
          sortedData.push({
            d: moment(date).format('MMM DD'),
            p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
            x: count, //previous days
            y: bitcoinData.bpi[date] // numerical price
          });
          count++;
        }
        this.setState({
          data: sortedData,
          fetchingData: false
        })
      })
      .catch((e) => {
        console.log(e);
      });
  }
  componentDidMount(){
    this.getData();
  }
/*
  const ControlledTabs = React.createClass(){
    getInitialState() {
      return {
        key: 1
      };
    },
  } */


  render() {
    return (
      <div>
      <div className="App-header">
          <h1> CrypoBot </h1>
      </div>
        <div className='container'>
          <div className='exchanges'>
          <div className='prices'>


            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="navigation">
              <Tab eventKey={1} title="Coinbase">
              <button>
                Buy/Sell
              </button>
              <div className='row'>
                <h1>30 Day Bitcoin Price Chart</h1>
              </div>
              <div className='row'>
                { !this.state.fetchingData ?
                <InfoBox data={this.state.data} />
                : null }
              </div>
              <div className='row'>
                <div className='popup'>
                  {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
                </div>
              </div>
              <div className='row'>
                <div className='chart'>
                  { !this.state.fetchingData ?
                    <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
                    : null }
                </div>
              </div>
              </Tab>
              <Tab eventKey={2} title="Gemini">Tab 2 content</Tab>
              <Tab eventKey={3} title="Kraken">Tab 3 content</Tab>
            </Tabs>

      </div>
    </div>
    </div>
    </div>
    );
  }
}

export default App;
