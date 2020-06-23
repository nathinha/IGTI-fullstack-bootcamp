import React, { Component } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

const url = 'https://randomuser.me/api/?seed=rush&nat=br&results=10';
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false
    }
  }
  async componentDidMount() {
    const res = await fetch(url);
    const json = await res.json();

    this.setState({
      users: json.results
    });
  }

  handleShowUsers = (isChecked) => {
    this.setState({
      showUsers: isChecked
    });
  }

  render() {
    const { showUsers, users } = this.state;

    return (
      <div className="container" >
        <h3>React Lifecycle</h3>
        <div className="divider"></div>
        <div className="section">
          <Toggle description="Show users" enabled={showUsers} onToggle={this.handleShowUsers} />
        </div>
        <div className="divider"></div>
        <div className="section">
          {showUsers && <Users users={users} />}
        </div>
      </div >
    );
  }
}
