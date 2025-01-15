// STATUS READER
// CODE WRITTEN BY KATHERINE ANDERSON

// A list of valid statuses.  This can then be expanded if, say, you want to indicate multiple types of failure states.
var statusVar = {
	0: "PASS",
	1: "WARN",
	2: "FAIL"
};

// print all of the statuses
function printStatuses() {
	let output = "";
	for (i = 0; i < statusList.statuses.length; i++)
	{
		output = output + readLine(i)+ "<br>";
	}
	
	// timestamp it so it's obvious when the page was last refreshed
	let now = new Date();
	output = output + "<br>Status retrieved at " + now;
	
	document.getElementById("Output").innerHTML = output;
}

// print a line of the status file
function readLine(index) {
	let name = statusList.statuses[index].name;
	let stat = statusList.statuses[index].status;
	
	// error handling, shouldn't happen but if it does call it out
	if (statusVar[stat] === undefined)
	{
		return name + ": ERROR";
	}
	
	return name + ": " + statusVar[stat];
}