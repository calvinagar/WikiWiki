import React, { Component } from "react";
import Table from 'react-bootstrap/Table'


export default class Leaderboard extends Component {
	constructor() { //add userid as parameter, so that we can populate data from constructor??
        super();
 		this.state = {
		  data: null,
		}; 
	}
    //Delete this:
    componenetDidMount() {
        fetch('/getPlayerGames')
            .then(res => {console.log(res);})
    }

    //funct getdata
        //using api pull number of people in leaderboards
        //create blank array
        //set each element of array equal to a person in the leaderboard and wrap for table element
        //in render() below add the array wrapped in {}


    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    //array object goes here
                </tbody>
            </Table>
        );
    }
}