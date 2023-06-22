const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv");
    // This header tells the browser how to display the data, particularly in the browser or as a separate file.
    // we signal to the browser that this CSV file is an attachment and should be downloaded. 
    // We then tell the browser that the file’s name is oceanpals.csv.
    res.writeHead(200);
    res.end(`id, name, email\n1,Sammy Shark, shark@ocean.com`);
    // our call to res.end() has a string that’s a valid CSV.

};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
