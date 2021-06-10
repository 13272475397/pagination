import React, { Component } from 'react';
import './App.css';
import Paginations from './pages/Paginaions.js'
import UsePagination from './pages/PageHook'

const data = require("./data.json");
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModel: data.slice(0, 10)
    }
  }
  change = (page, pageSize) => {
    let showModel = data.slice((page - 1) * pageSize, page * pageSize);
    this.setState({
      showModel
    })

  }
  render() {

    return (
      <div className="App">
        <div>
          {
            this.state.showModel.map((item, i) => (
              <p key={i}>{i + 1}:{item.label}</p>
            ))
          }
        </div>
        {/* <UsePagination
          pageSize={10}
          total={data.length}
          page={1}
          interval={5000}
          onChange={this.change}
        /> */}

        <Paginations
          pageSize={10}
          total={data.length}
          page={1}
          interval={5000}
          onChange={this.change}
        />
      </div>
    );
  }

}

export default App;
