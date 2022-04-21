import React, {Component} from "react";
import './Sidebar.css'

class Sidebar extends Component {
    render () {
        return (
        <div id="wrapper" className="toggled">
          <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                {" "}
                <a href="#"> WikWiki </a>
              </li>
              <li>
                {" "}
                {" "}
                <a href="#">Home</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Leaderboard</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">User</a>{" "}
              </li>
              <li>
                {" "}
                <a href="#">Play</a>{" "}
              </li>
            </ul>
          </div>
        </div>
        );
    }
  };
export default Sidebar;