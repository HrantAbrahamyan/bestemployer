import React, { Component } from "react";
import TableList from "./Containers/Ui/TableList/TableList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <TableList />
      </div>
    );
  }
}

export default App;
