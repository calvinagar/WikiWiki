import React, { Component } from "react";
import ReactDOM from "react-dom";
// Note: Not in a bootstrap theme

class GameDiv extends Component {
	constructor() {
        super();
 		this.state = {
		  count: 0,
		}; 

        this.UserAction('Rock_music') // Needs to be switched with a pulled title of a random page
	}

    UserAction = (pageTitleStr) => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://en.wikipedia.org/w/api.php?action=parse&page=" + pageTitleStr + "&prop=text&formatversion=2&format=json&origin=*", true);
        xhttp.send();
        xhttp.onload = () => {
            if (xhttp.status == 200) {
                this.gotData(JSON.parse(xhttp.response));
            } else {
                console.log("error " + xhttp.status + ": " + xhttp.statusText)
            }
        }
        
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

    //no longer needed
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
        console.log(data);
        
        // Get the HTML of the Wiki page from JSON
        var text = data.parse.text;
        // Get the title of the Wiki page from JSON
        var title = data.parse.title;
        
        // Set the gameDiv to blank to clear any previous Wiki page data
        document.getElementById("gameDiv").innerHTML = "";
        
        // Add both the title and the body of the Wiki page
        document.getElementById("gameDiv").innerHTML = "<h1 class='mw-headline'>" + title + "</h1>" + text;
        
        // Remove problematic elements (images, table of contents, refrences, edit buttons, etc.)
        const classesToRemove = ['.thumb', '.sistersitebox', '.mw-editsection', '.toc', '.reflist', '.reference', '.infobox', '.image', '.dmbox', '.box-Multiple_issues', '.sidebar-navbar', '.mbox-small'];
        for (var i = 0; i < classesToRemove.length; i++) {
            document.querySelectorAll(classesToRemove[i]).forEach(e => e.remove());
        }
        
        // remove refrence section. this section is not targetable by class like the rest, so we have to use it's ID
        var refElement = document.getElementById("References");
        // If it isn't "undefined" and it isn't "null", then it exists.
        if(typeof(refElement) != 'undefined' && refElement != null){
            document.getElementById("References").remove();
        }
        
        // Add event listener to all links
        var links = document.querySelectorAll( 'a' );
        for ( var c = 0; c < links.length; c ++ ) {
            links[c].addEventListener('click', this.WhichLinkWasClicked);
        }
        
    }

    render() {
        return (
            <>
                <p class="score" id="score">Number of Links Clicked: {this.state.count}</p>
                
                <div id="gameDiv" class="gameDiv">
                    
                </div>
            </>
        );
      }

}

export default GameDiv;