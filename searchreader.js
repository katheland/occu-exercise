// SEARCH READER
// CODE WRITTEN BY KATHERINE ANDERSON

const lineLabels = "<table><tr><th>Name</th><th>Food</th><th>Animal</th><th>Color</th><th>Last Updated</th></tr>";
const tableEnd = "</table>";

// called when the enter button is pressed
function doTheThing() {
    // reset any errors that might have cropped up
    document.getElementById("Errors").innerHTML = "";
    // go to the right function based on which radio button is selected
    let val = document.querySelector("input[name='funcType']:checked").value;
    switch(val) {
        case "printAll":
            printData();
            break;
        case "search":
            searchEntries();
            break;
        case "create":
            createEntry();
            break;
        case "update":
            updateEntry();
            break;
        case "delete":
            deleteEntry();
            break;
    } 
}

// formats a line of data into an HTML table row
function readLine(dat) {
    return "<tr><td>" + dat.name + "</td><td>" + dat.food + "</td><td>" + dat.animal + "</td><td>" + dat.color 
                + "</td><td>" + dat.lastUpdated + "</td></tr>";
}

// prints the entire database
function printData() {
    let output = lineLabels;
    for (i = 0; i < searchList.data.length; i++) {
        output = output + readLine(searchList.data[i]);
    }
    output = output + tableEnd;

    document.getElementById("Output").innerHTML = output;
}

// if a name exists, return the entry's intex in the array
function nameExists(name) {
    for (i = 0; i < searchList.data.length; i++) {
        if (searchList.data[i].name === name) 
            return i;
    }
    return -1;
}

// add a new entry to the data
function createEntry() {
    // check if there is a name input
    if (document.getElementById("name").value === '') {
        sendError("A new entry needs to at least have a name.");
        return;
    }
    // make sure there isn't already an instance of that name
    if (nameExists(document.getElementById("name").value) > -1) {
        sendError("An entry with this name already exists.");
        return;
    }
    // add a new entry to the data
    let newline = {
        name: document.getElementById("name").value,
        food: document.getElementById("food").value,
        animal: document.getElementById("animal").value,
        color: document.getElementById("color").value,
        lastUpdated: new Date()
    }
    searchList.data.push(newline);
    printData();
}

// update an entry
function updateEntry() {
    // check if there is a name input
    if (document.getElementById("name").value === '') {
        sendError("Please name the entry to update.");
        return;
    }
    // make sure that there's an entry to update with that name
    let entry = nameExists(document.getElementById("name").value);
    if (entry === -1) {
        sendError("No entry with that name exists.");
        return;
    }
    // update the entry if a field is filled in
    if (document.getElementById("food").value !== '')
    {
        searchList.data[entry].food = document.getElementById("food").value;
    }
    if (document.getElementById("animal").value !== '')
    {
        searchList.data[entry].animal = document.getElementById("animal").value;
    }
    if (document.getElementById("color").value !== '')
    {
        searchList.data[entry].color = document.getElementById("color").value;
    }
    searchList.data[entry].lastUpdated = new Date();
    printData();
}

// remove an entry from the data
function deleteEntry() {
    // check if there is a name input
    if (document.getElementById("name").value === '') {
        sendError("Please enter the name of an entry to delete.");
        return;
    }
    // make sure that there's an entry to delete with that name
    let entry = nameExists(document.getElementById("name").value);
    if (entry === -1) {
        sendError("No entry with that name exists.");
        return;
    }
    // delete the entry named by the name text input
    searchList.data.splice(entry, 1);
    printData();
}

// search the data
function searchEntries() {
    // gets the input from the drop down menu
    let selection = document.getElementById("searchSelect").value;
    let output = "";
    // special case if name is selected because it's unique
    if (selection === "name") {
        // check if there is a name input
        if (document.getElementById("name").value === '') {
            sendError("Please enter a name to search for.");
            return;
        }
        // make sure that there's an entry with that name
        let entry = nameExists(document.getElementById("name").value);
        if (entry === -1) {
            sendError("No entry with that name exists.");
            return;
        }
        output = lineLabels + readLine(searchList.data[entry]) + tableEnd;
    }
    else {
        // check if there is an input of that type
        if (document.getElementById(selection).value === '') {
            sendError("Please enter a value for " + selection + " to search for.");
            return;
        }
        // print any lines that match the search
        let query = document.getElementById(selection).value;
        let found = false;
        output = lineLabels;
        for (i = 0; i < searchList.data.length; i++) {
            if (searchList.data[i][selection] === query)
            {
                output = output + readLine(searchList.data[i]);
                found = true;
            }
        }
        if (found === false) {
            sendError("No entries found with " + selection + " = " + query);
            return;
        }
        else {
            output = output + tableEnd;
        }
    }
    document.getElementById("Output").innerHTML = output;
}

// if there's an error, display it
function sendError(error) {
    document.getElementById("Errors").innerHTML = error;
}