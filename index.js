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

//select DOM
const partyDetails = document.getElementById('party-deets');
const formButton = document.querySelector('#addMoreParty');
const deleteParty = document.querySelector('#deleteButton');

//create function to render but wait for API data
async function render () {
    await getParty();
    listParties();
    deleteFunction();
};
render();

//GET Parties from API getParty();
async function getParty() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json.data;
    } catch {
        console.error(error);
    }
    //console.log(state.parties);
};


//display parties info from state, listParties(); add button;
function listParties() {
    const partyInfo = state.parties.map((party) => {
        const list = document.createElement("li");
        // const button = document.createElement("button");
        // button.textContent = "Remove Party";
        // button.id = "deleteButton";
        list.innerHTML = `
        <h2>${party.name}</h2>
        <p><b>Date & Time:</b> ${party.date}</p>
        <p><b>Location:</b> ${party.location}</p>
        <p><b>Description:</b> ${party.description}</p>
        `;
        // list.append(button);
        return list;
    });
    partyDetails.replaceChildren(...partyInfo);

};

//create new party and POST to API from form
formButton.addEventListener("submit", addParty);

async function addParty(party) {
    party.preventDefault();
    try {
        const postParty = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formButton.name.value,
                date: formButton.date.value,
                location: formButton.location.value,
                description: formButton.description.value,
              }),
            });
            if (!postParty.ok) {
                throw new Error("Failed to create party");
              }
                   //re-render from state
     render();
    } catch (error) {
        console.error(error);
    };
};

// create delete button
function deleteFunction() {
    const partyList = state.parties.map((party) => {
        const list = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = "Remove Party";
        button.id = "deleteButton";
        //list.append(button);
})
partyDetails.appendChild(...button);
};

//listen to deleteButton and create function to DELETE from API
deleteParty.addEventListener("submit", removeParty);

async function removeParty() {
    try {
        const goneParty = await fetch(API_URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: deleteParty.id.value,
                name: deleteParty.name.value,
                date: deleteParty.date.value,
                location: deleteParty.location.value,
                description: deleteParty.description.value,
              }),
            });
            if (!goneParty.ok) {
                throw new Error("Failed to remove party");
              }
                   //re-render from state
     render();
    } catch (error) {
        console.error(error);
    };
};