const http = require("http");

const host = 'localhost';
const port = 8000;

console.log('welcome to my server')





const handleRequest = (req, res) => {

const prompt = require('prompt-sync')({sigint: true});
const choice = prompt('Would u like to add or read a quote? : ');
console.log(`~ you chose : ${choice}`);

    if (choice === "read"){
        getRequest(req, res)
    } else if (choice === "add"){
        postRequest(req, res)
    } else {
        console.log("invalid choice");
        console.log(" _ _ _ _ _ _ _ _")

    }

}


const getRequest = function (req, response) {
        
    fetch("https://www.affirmations.dev/")
      .then((apiResponse) => apiResponse.json())
      .then((json) => {
            console.log(json);
            console.log(" _ _ _ _ _ _ _ _")
            let data = JSON.stringify(json);
            response.setHeader("Content-Type", "application/json")
            response.end(data);
        });
};


// The res.setHeader() method adds an HTTP header to the response. 
// HTTP headers are additional information that can be attached to a request or a response.
// The Content-Type header is used to indicate the format of the data, also known as media type, 
// that’s being sent with the request or response. In this case our Content-Type is application/json.


let quotes = {
    affirmation: "T'es la meilleure bb"
    }


const postRequest = (req, res) => {

    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    
    req.on("end", () => {
        try {
            const postData = JSON.parse(body);
            console.log("POST request:", postData);
            const response = { message: "POST request received" };
            let data = JSON.stringify(response);
            res.setHeader("Content-Type", "application/json");
            res.end(data);

        } catch (error) {
            console.error(error);
            res.statusCode = 400;
            res.end();
        }
    });
};

      

const server = http.createServer(handleRequest);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


