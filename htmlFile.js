const http = require("http");
const fs = require('fs').promises;
// fs module contains a readFile() function to load the HTML file in place. 
// here we use promises for its simple syntax, but we'd use callbacks if fs was assigned to just "require('fs')"


const host = 'localhost';
const port = 8000;


let indexFile; 
// When we run this program, this variable will hold the HTML file’s contents.



// const requestListener = function (req, res) {
//     fs.readFile(__dirname + "/index.html")
//     // fs.readfile method loads the file
//         .then(contents => {
//             res.setHeader("Content-Type", "text/html");
//             res.writeHead(200);
//             res.end(indexFile);
//         })
//         // if the promise successfully resolves, it will return its data. Contents parameters contain html file's data
//         .catch(err => {
//             res.writeHead(500);
//             res.end(err);
//             return;
//         });
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });


const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};


const server = http.createServer(requestListener);

fs.readFile(__dirname + "/index.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

// The code that reads the file is similar to what we wrote in our first attempt. 
// However, when we successfully read the file we now save the contents to our global indexFile variable. 
// We then start the server with the listen() method. 
// The key thing is that the file is loaded before the server is run. 
// This way, the requestListener() function will be sure to return an HTML page, as indexFile is no longer an empty variable.