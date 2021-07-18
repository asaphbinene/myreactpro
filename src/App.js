import React, { Component } from 'react';
import { DoBanner } from "./DoBanner";
import { DoCreator } from "./DoCreator";
import { TheDoRow } from "./TheDoRow";
import { VisibilityControl } from "./VisibilityControl";


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
      showCompleted: true
    }
  }

  updateNewTextValue = ( event ) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewDo = ( task ) => {
    if(!this.state.doItems.find
        (item => item.action === task )){
      this.setState({
         doItems: [ ...this.state.doItems, 
          { action: task, done: false}]
      }, () => localStorage.setItem("theDos", JSON.stringify(this.state)));
    }
  }

  toggleDo = ( theDo) => this.setState({
    doItems: this.state.doItems.map(
      item => item.action === theDo.action 
      ? { ...item, done: !item.done } : item )
  });

  theDoTableRows = ( doneValue ) => this.state.doItems
    .filter( item => item.done === doneValue).map(
      item => 
        <TheDoRow key={ item.action } item={ item } 
          callback={ this.toggleDo }/>
      )

  componentDidMount = () => {
    let data = localStorage.getItem("theDos");
    this.setState(data != null 
        ? JSON.parse(data)
        : {
          userName: "Asaph",
          doItems: [
            {action: "Take Cofee", done: false },
            { action: "Go for Meeting", done: false },
            { action: "Take Lunch", done: true },
            { action: "Make day Calls", done: false }
          ],
          showCompleted: true
        });
  }
  //changeStateData = () => {
  //  this.setState({
  //    userName: this.state.userName == "Asaph" ? "Binene" : "Asaph"
  //  })
  //}
  render = () => 
    <div>
      <DoBanner name={ this.state.userName } tasks={ this.state.doItems }/>
      <div className="container-fluid">
        <DoCreator callback={ this.createNewDo }/>
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{ this.theDoTableRows(false) }</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks"
            isChecked={ this.state.showCompleted }
            callback={ (checked) => 
              this.setState({ showCompleted: checked })}/>
        </div>
        {
            this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr><th>Description</th><th>Done</th></tr>
              </thead>
              <tbody>{ this.theDoTableRows(true) }</tbody>
            </table>
        }
      </div>
    </div>
}

