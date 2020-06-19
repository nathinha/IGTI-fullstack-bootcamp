import React, { Component } from 'react'
import User from './User';

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      secondsVisible: 0
    }

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({
        secondsVisible: secondsVisible + 1
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { users } = this.props;
    const { secondsVisible } = this.state;

    return (
      <div>
        <h4>Users</h4>
        <h5>Users visible for {secondsVisible} seconds</h5>
        <ul>
          {users.map((user) => {
            const { login } = user;
            return (
              <li key={login.uuid}>
                <User user={user} />
              </li>);
          })}
        </ul>
      </div>
    );
  }
}
