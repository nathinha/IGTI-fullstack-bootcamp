import React, { Component } from 'react'
import css from './user.module.css'

export default class User extends Component {
  render() {
    const { name, picture } = this.props.user;
    const fullName = `${name.first} ${name.last}`;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={picture.thumbnail} alt={fullName} />
        <span>{fullName}</span>
      </div>
    );
  }
}
