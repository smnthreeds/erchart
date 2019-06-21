import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Bar} from 'react-chartjs-2';
import moment from "moment";

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bulkdata: [],
      acctrans: [],
      accgas: [],
      time: [],
      users: [],
      fees: []
    };
  }
  componentDidMount() {
    axios.get('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0xbe233c4bc5c4e4f0c9c7d2b1908047dc51f98748&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken')
      .then(res => {
        const bulkdata = res.data;
        const acctrans = res.data.result.length;
        const accgas = res.data.result[res.data.result.length - 1].cumulativeGasUsed
        var user = []
        var fee = []
        for (var i = 0; i < res.data.result.length; i++) {
           user.push(res.data.result[i].from);
        }
        for (var i = 0; i < res.data.result.length; i++) {
          fee.push(parseInt(res.data.result[i].gasPrice));
       }

       var fees = 0;

      for(var i = 0; i < fee.length; i++){

        fees += fee[i]

      }
        const users = Array.from(new Set(user)).length;
        
        const time =  moment.unix(res.data.result[res.data.result.length - 1].timeStamp).utc().format('dddd, MMMM Do, YYYY h:mm:ss A')
        
        this.setState({ bulkdata: bulkdata })
        this.setState({ acctrans: acctrans })
        this.setState({ accgas: accgas })
        this.setState({ time: time })
        this.setState({ users: users })
        this.setState({ fees: fees })
        console.log(bulkdata);
        console.log(accgas);
        console.log(time)
        console.log(users)
        console.log(fees)
        // console.log(bulkdata.result.length)
      })
  }

  render(){
  const data = {
    labels: [this.state.time],
    datasets: [
      {
        label: 'Accumulative Users',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // data: this.state.btc
        data: [this.state.users]
      },
      {
        label: 'Accumulative Interactions',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#000000',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [this.state.acctrans]
      },
      {
        label: 'Accumulative Gas Fees/100000000',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'green',
        borderColor: 'green',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#000000',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [this.state.fees/100000000]
      },
      {
        label: 'Accumulative Gas Used',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#000000',
        pointBackgroundColor: '#000000',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#000000',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [this.state.accgas]
      }
    ]
  };
  const options = {
       
    annotation: {
         annotations: [{
             drawTime: 'afterDatasetsDraw',
             borderColor: 'red',
             borderDash: [2, 2],
             borderWidth: 2,
             mode: 'horizontal',
             type: 'line',
             value: 1,
             stepSize: 20,
             scaleID: 'x-axis-0',
       }]
    },
    maintainAspectRation: true,
    responsive: true
};
  return (
    <Bar
    data = {data}
    width={10}
    height={50}
    
      />
  );
}
}

export default App;
