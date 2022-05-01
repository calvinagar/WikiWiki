import React, { Component } from "react";
import Table from 'react-bootstrap/Table'


export default class Leaderboard extends Component {
	constructor() {
        super();
 		this.state = {
          games: []
		}; 

        this.getData();
	}

    getData = async () =>
    {
        try{
            var response = await fetch(buildPath('api/getDailyLeaderboard'), {method:'POST',headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            console.log(res);

            var tempGames = "";

            for(let i = 0; i < res.leaderboard.length; i++){
                tempGames += " <tr> <td>" + (i+1) + "</td>" +
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
                <tbody dangerouslySetInnerHTML={{__html: this.state.games}}>
                </tbody>
            </Table>
        );
    }
}

const app_name = 'wikiwiki-cop4331'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5001/' + route;
    }
}
