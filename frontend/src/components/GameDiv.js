import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


var globalPages = {start_title: "", end_title: "", current_title: ""};


class GameDiv extends Component {
    
	constructor() {
        super();
 		this.state = {
		  count: 0,
		}; 
	}

    async componentDidMount()
    {
        
        // Get Start page title
        fetch('https://en.wikipedia.org/api/rest_v1/page/random/title')
        .then((response) => response.json())
        .then((findresponse)=>{
            const temp = findresponse.items[0].title;
            return temp
        }).then(function(value) { localStorage.setItem('start_page', value); localStorage.setItem('current_page', value);});


        //Get end game title
        fetch('https://en.wikipedia.org/api/rest_v1/page/random/title')
        .then((response) => response.json())
        .then((findresponse)=>{
            const temp = findresponse.items[0].title;
            return temp
        }).then(function(value) { localStorage.setItem('end_page', value);});

        var page = {start_title: localStorage.getItem('start_page'), end_title: localStorage.getItem('end_page'), current_title: localStorage.getItem('start_page')};

        globalPages = page;

        document.getElementById('startDiv').innerHTML = "<p><b>StartPage: </b> " + globalPages.start_title.replaceAll('_', ' ') + "</p>";
        document.getElementById('endDiv').innerHTML = "<p><b>EndPage: </b> " + globalPages.end_title.replaceAll('_', ' ') + "</p>";
        console.log("Make sure the underscores are still there: " + globalPages.start_title);
        this.UserAction(globalPages.start_title);

        //The previous code may seem unecessary BUT IT IS NECESSARY. Please do not change, the pages were being set to different values once UserAction is called every game.

        /*let xhttp1 = new XMLHttpRequest();
        let str = ""
        xhttp1.open("GET", "https://en.wikipedia.org/api/rest_v1/page/random/title", true);
        xhttp1.send();
        xhttp1.onload = () => {
            if (xhttp1.status == 200) {
                str = JSON.parse(xhttp1.response).items[0].title
                console.log(str);
                
                let str2 = "";

                let xhttp2 = new XMLHttpRequest();
                xhttp2.open("GET", "https://en.wikipedia.org/api/rest_v1/page/random/title", true);
                xhttp2.send();
                xhttp2.onload = () => {
                    if (xhttp2.status == 200) {
                        str2 = JSON.parse(xhttp2.response).items[0].title;
                        console.log("first title: " + str);
                        console.log("second title: " + str2);
                        var obj = {start_title:str, end_title:str2};
                        localStorage.setItem('initial_game', JSON.stringify(obj));
                    } else {
                        console.log("error " + xhttp2.status + ": " + xhttp2.statusText);
                    }
                }

            } else {
                console.log("error " + xhttp1.status + ": " + xhttp1.statusText);
            }   
        }
        //console.log("str from below: " + str);
        //console.log(JSON.parse(localStorage.getItem('initial_game')));
        //console.log("testestsetst" + JSON.parse(localStorage.getItem('initial_game')).start_title);
        //let startTitle = JSON.parse(localStorage.getItem('initial_game')).start_title;
        var game = JSON.parse(localStorage.getItem('initial_game'));
        document.getElementById('startDiv').innerHTML = "<p><b>StartPage: </b> " + game.start_title.replaceAll('_', ' ') +"</p>";
        document.getElementById('endDiv').innerHTML = "<p><b>EndPage: </b> " + game.end_title.replaceAll('_', ' ') +"</p>";
        this.UserAction(game.start_title);*/
    }

    UserAction = (pageTitle) => {
        
        globalPages.current_title = pageTitle;

        if (localStorage.getItem('running_game')) {
            localStorage.removeItem('running_game');
            localStorage.setItem('running_game', globalPages);
        } else {
            localStorage.setItem('running_game', globalPages);
        }

        //Complete Game
        if (pageTitle == globalPages.end_title)
        {
            //Finish by contacting API with end game call
            var done = {user: localStorage.getItem('user_data').res.id, start_title: globalPages.start_title, end_title: globalPages.end_title, clicks: this.state.count};
        }
        // Add call to update here:
        

        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://en.wikipedia.org/w/api.php?action=parse&page=" + pageTitle + "&prop=text&formatversion=2&format=json&origin=*", true);
        xhttp.send();
        xhttp.onload = () => {
            if (xhttp.status == 200) {
                this.gotData(JSON.parse(xhttp.response));
            } else {
                console.log("error " + xhttp.status + ": " + xhttp.statusText)
            }
        };
                
        window.scrollTo(0, 0);
        
    }

    WhichLinkWasClicked = (evt) => {
        // Dont follow the link
        evt.preventDefault();
        
        // Get the link's target wiki page
        var str = evt.target;
        str = typeof str !== 'string' ? str.toString() : str;
        var afterLastSlash = str.split('/').pop();
        
        // Increment count
        //this.upper();
        this.setState({ count: this.state.count + 1 });
        
        // Start the process over, at the new page
        this.UserAction(afterLastSlash);
        console.log(afterLastSlash);
    }

    /*upper = () => {
        var score = document.getElementById('score');
        var text = score.innerHTML; 
        const myArray = text.split(" ");
        var number = myArray[4];
        number++;
        score.innerHTML = "Number of Links Clicked: " + number;
    }*/
    
    gotData = (data) => {
    
        // Log data for testing purposes
        //console.log(data);
        
        // Get the HTML of the Wiki page from JSON
        var text = data.parse.text;
        // Get the title of the Wiki page from JSON
        var title = data.parse.title;

        var gameDoc = document.getElementById("gameDiv");
        
        // Set the gameDiv to blank to clear any previous Wiki page data
        gameDoc.innerHTML = "";
        
        // Add both the title and the body of the Wiki page
        gameDoc.innerHTML = "<h1 class='mw-headline'>" + title + "</h1>" + text;
        
        // Remove problematic elements (images, table of contents, refrences, edit buttons, etc.)
        const classesToRemove = ['.thumb', '.sistersitebox', '.mw-editsection', '.toc', '.reflist', '.reference', '.infobox', '.image', '.dmbox', '.box-Multiple_issues', '.sidebar-navbar', '.mbox-small'];
        for (var i = 0; i < classesToRemove.length; i++) {
            gameDoc.querySelectorAll(classesToRemove[i]).forEach(e => e.remove());
        }
        
        // remove refrence section. this section is not targetable by class like the rest, so we have to use it's ID
        var refElement = document.getElementById("References");
        // If it isn't "undefined" and it isn't "null", then it exists.
        if(typeof(refElement) != 'undefined' && refElement != null){
            document.getElementById("References").remove();
        }
        
        // Add event listener to all links
        var links = gameDoc.querySelectorAll( 'a' );
        for ( var c = 0; c < links.length; c ++ ) {
            links[c].addEventListener('click', this.WhichLinkWasClicked);
        }
        
    }

    quitGame = () =>
    {

    }

    render() {
        return (
            <>
                <Row id="newRow3">
                    <Col><p class="score" id="score">Number of Links Clicked: {this.state.count}</p></Col>
                    <Col><Button onClick={this.quitGame} id="quitBtn">Quit</Button></Col>
                </Row>
                <Row>
                <div id="gameDiv" class="gameDiv"/>
                </Row>
            </>
        );
      }

}

export default GameDiv;