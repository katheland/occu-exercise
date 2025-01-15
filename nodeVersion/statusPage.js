// STATUS READER (ALTERNATE)
// CODE BY KATHERINE ANDERSON

var http = require('http');
var fs = require('fs');

// A list of valid statuses.  This can then be expanded if, say, you want to indicate multiple types of failure states.
var statusVar = {
	0: "PASS",
	1: "WARN",
	2: "FAIL"
};

// This loads the json file and prints its contents to a web page.
http.createServer(function (req, res) {
        fs.readFile('statusList.json', function(err, data) {
                let statuses = JSON.parse(data);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(formatStatuses(statuses));
                return res.end();
        });
}).listen(8080);

// format the status json to something easier to read (ie. fewer brackets)
function formatStatuses(statuses) {
        let output = "";
	for (i = 0; i < statuses.length; i++)
	{
		output = output + readLine(statuses[i])+ "<br>";
	}
	
        // timestamp it
	let now = new Date();
	output = output + "<br>Status retrieved at " + now;
        return output;
}

// read and print each line of the status json
function readLine(index) {
	let name = index.name;
	let stat = index.status;
	
	// If we have an invalid status, this is where we call an error.  This shouldn't happen, but.
	if (statusVar[stat] === undefined)
	{
		return name + ": ERROR";
	}
	
	return name + ": " + statusVar[stat];
}