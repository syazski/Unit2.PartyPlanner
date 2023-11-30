/*USER STORY:
A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.
Next to each party in the list is a delete button. 
The user clicks the delete button for one of the parties. 
That party is then removed from the list.
There is also a form that allows the user to enter information about a new party that they want to schedule. 
After filling out the form and submitting it, the user observes their party added to the list of parties.*/

//API URL, append with Cohort name & /events endpoint
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b-syaz/events`;

//create state
const state = {
    parties: []
};

const partyDetails = document.getElementById('party-deets');
const formButton = document.querySelector('#AddParty');

//create function to render but wait for API data
async function render () {
    await getParty();
    listParties();
};


//GET Parties from API getParty();
async function getParty() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json.data;
    } catch {
        console.error(error);
    }
    console.log(state.parties);
};


//display parties info from state, listParties();
function listParties() {
    const partyInfo = state.parties.map((party) => {
        const list = document.createElement("li");
        list.innerHTML = `
        <h2>${party.name}</h2>
        <p><b>Date & Time:</b> ${party.date}</p>
        <p><b>Location:</b> ${party.location}</p>
        <p><b>Description:</b> ${party.description}</p>
        `;
        return list;
    });

    partyDetails.replaceChildren(...partyInfo);
};

render();

//formButton.addEventListener("submit", addPartyForm);


//create new party from form

//create function to add delete button party from list
