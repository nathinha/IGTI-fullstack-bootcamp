import React from 'react'
import css from './user.module.css'

export default function User(props) {
  const { name, picture } = props.user;
  const fullName = `${name.first} ${name.last}`;
  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={picture.thumbnail} alt={fullName} />
      <span>{fullName}</span>
    </div>
  );
}
