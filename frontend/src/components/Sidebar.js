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
                <a href="MainPage">Home</a>{" "}
              </li>
              <li>
                {" "}
                <a href="LeaderboardPage">Leaderboard</a>{" "}
              </li>
              <li>
                {" "}
                <a href="UserPage">User</a>{" "}
              </li>
              <li>
                {" "}
                <a href="GamePage">Play</a>{" "}
              </li>
            </ul>
          </div>
        </div>
        );
    }
  };
export default Sidebar;