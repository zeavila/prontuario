import React, { Component } from "react";
import "./styles.css";

export default class SideMenu extends Component {
  render() {
    return (
      <div id="side-menu">
        <h1>Prontomed</h1>
        <ul>
          <li>
            <a href="/">Pacientes</a>
          </li>
          <li>
            <a href="/schedules">Agendamentos</a>
          </li>
        </ul>
      </div>
    );
  }
}
