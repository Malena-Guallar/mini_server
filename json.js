const http = require("http");

const host = 'localhost';
const port = 8000;




const requestListener = function (req, res) {

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);

    fetch("https://www.affirmations.dev/")
      .then((res) => res.json())
      .then((json) => {
        console.log("coucou", json);
        let data = JSON.stringify(json);
        // return data;
         res.end(data);
        });

    
   
};
// The res.setHeader() method adds an HTTP header to the response. 
// HTTP headers are additional information that can be attached to a request or a response.
// The Content-Type header is used to indicate the format of the data, also known as media type, 
// that’s being sent with the request or response. In this case our Content-Type is application/json.




const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

