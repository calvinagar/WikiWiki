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
            var response = await fetch(buildpath('/api/getDailyLeaderboard'), {method:'POST',headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            //if id == -1 error?
            //else:
           //this.setState({games: res.Leaderboard});
            var rank = 1;

            tempGames = [];

            for(i = 0; i < res.Leaderboard.length; i++){
                tempGames[i] = ""res.Leaderboard[i]
            }
            
            
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
                    //array object goes here
                </tbody>
            </Table>
        );
    }
}