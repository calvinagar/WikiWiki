import React, { Component } from "react";
import Table from 'react-bootstrap/Table'


export default class Leaderboard extends Component {
	constructor() { //add userid as parameter, so that we can populate data from constructor??
        super();
 		this.state = {
		  user: localStorage.getItem('user_data'),
          games: []
		}; 

        this.getData();
	}

/*     componenetDidMount() {
        fetch('/getPlayerGames')
            .then(res => {console.log(res);})
    } */

    getData = async () =>
    {
        try{
            var response = await fetch(buildPath('api/getDailyLeaderboard'), {method:'POST',headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            //if id == -1 error?
            //else:
           
            var rank = 1;

            var tempGames = [];

            for(let i = 0; i < res.Leaderboard.length; i++){
                tempGames[i] = " <tr> <td>" + res.leaderboard[i].rank + "</td>" +
                                " <td>" + res.leaderboard[i].login + "</td>" +
                                " <td>" + res.leaderboard[i].clicks + "</td>" +
                                " <td>" + res.leaderboard[i].startpage + "</td>" + 
                                " <td>" + res.leaderboard[i].endpage + "</td> </tr>";
            }
            
            this.setState({ games: tempGames });
            
        }
        catch(e)
        {
            alert(e.toString())
        }
    }
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
                        <th>Username</th>
                        <th>Clicks</th>
                        <th>Start-Page</th>
                        <th>End-Page</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.games}
                </tbody>
            </Table>
        );
    }
}