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
                WikiWiki
              </li>
              <li>
                {" "}
                <a href="/main">Home</a>{" "}
              </li>
              <li>
                {" "}
                <a href="/leaderboard">Leaderboard</a>{" "}
              </li>
              <li>
                {" "}
                <a href="/user">User</a>{" "}
              </li>
              <li>
                {" "}
                <a href="/play">Play</a>{" "}
              </li>
            </ul>
          </div>
        </div>
        );
    }
  };
export default Sidebar;