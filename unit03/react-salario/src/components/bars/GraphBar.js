import React, { Component } from 'react'
import { formatPercentageUS } from '../utils/formatters';

export default class GraphBar extends Component {
  render() {
    const { color_base, value_1st, value_2nd, color_1st, color_2nd } = this.props;

    return (
      <div className={`progress ${color_base}`}      >
        <div
          className={`determinate ${color_2nd}`}
          style={{ width: `${formatPercentageUS(value_1st + value_2nd)}` }}
        >
        </div>
        <div
          className={`determinate ${color_1st}`}
          style={{ width: `${formatPercentageUS(value_1st)}` }}
        >
        </div>
      </div>
    )
  }
}
