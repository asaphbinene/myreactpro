import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Asaph",
      doItems: [
        { action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Mado", done: false }
      ],

      newItemText: ""
    }
  }

  updateNewTextValue = ( event ) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewDo = () => {
    if(!this.state.doItems
          .find(item => item.action === this.state.newItemText))
    {
      this.setState(
        {doItems: [ ...this.state.doItems, 
          { action: this.state.newItemText, done: false}],
        newItemText: ""
      });
    }
  }

  toggleDo = ( theDo) => this.setState({
    doItems: this.state.doItems.map(
      item => item.action === theDo.action 
      ? { ... item, done: !item.done } : item )
  });

  theDoTableRows = () => this.state.doItems.map(
    item => 
    <tr key={ item.action }>
      <td>{item.action}</td>
      <td>{item.action}</td>
      <td>
        <input type="checkbox" checked = { item.done }
                onChange={ () => this.toggleDo( item )}/>
      </td>
    </tr>
  )

  //changeStateData = () => {
  //  this.setState({
  //    userName: this.state.userName == "Asaph" ? "Binene" : "Asaph"
  //  })
  //}
  render = () => {
    return (
      <div className="App">
        <h4 className="bg-primary text-white text-center p-2">
          { this.state.userName }'s Do Book
          ({ this.state.doItems.filter(t => !t.done).length } items to book)
        </h4>
        <div className="container-fluid">
          <div className="my-1">
            <input className="form-control"
              value={ this.state.newItemText }
              onChange={ this.updateNewTextValue }/>
            <button className="btn btn-primary mt-1"
              onClick={ this.createNewDo }>
                Add
            </button>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{ this.theDoTableRows() }</tbody>
          </table>
        </div>
      </div>
    );
  }
  
}

