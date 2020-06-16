import React, { Component } from 'react';
import InputReadOnly from './components/inputs/InputReadOnly';
import InputReadWrite from './components/inputs/InputReadWrite';
import GraphBar from './components/bars/GraphBar';
import { getSalary } from './components/utils/salary';
import './App.css'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gross: 0
    }
  }

  handleGrossChange = (gross) => {
    this.setState({
      gross
    });
  }

  render() {
    const { gross } = this.state;

    const salary = getSalary(gross);

    const net_color = "green lighten-1";
    const inss_color = "orange lighten-1";
    const irpf_color = "red lighten-1";

    return (
      <div className="container" >
        <div className="row">
          <h1 className="center-align indigo-text text-darken-3">Salary Calculator Tabajara</h1>
        </div>

        <div className="row">
          <div className="row">
            <InputReadWrite
              label="Salário Bruto"
              value={gross}
              onChange={this.handleGrossChange}
            />
          </div>

          <div className="row">
            <InputReadOnly
              label="Base INSS"
              value={salary.inss_base}
            />
            <InputReadOnly
              label="Desconto INSS"
              value={salary.inss_discount}
              percentage={salary.inss_percentage}
              color={inss_color}
            />
            <InputReadOnly
              label="Base IRPF"
              value={salary.irpf_base}
            />
            <InputReadOnly
              label="Desconto IRPF"
              value={salary.irpf_discount}
              percentage={salary.irpf_percentage}
              color={irpf_color}
            />
          </div>

          <div className="row">
            <InputReadOnly
              label="Salário Líquido"
              value={salary.net_value}
              percentage={salary.net_percentage}
              color={net_color}
            />
          </div>

          <div className="row">
            <GraphBar
              color_base={net_color}
              value_1st={salary.inss_percentage}
              color_1st={inss_color}
              value_2nd={salary.irpf_percentage}
              color_2nd={irpf_color}
            />
          </div>
        </div>
      </div>
    );
  }
}
