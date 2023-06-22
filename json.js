const http = require("http");

const host = 'localhost';
const port = 8000;

const prompt = require('prompt-sync')({sigint: true});

const handleRequest = (req, res) => {

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


const getRequest = async (req, response) => {

    await fetch("https://www.affirmations.dev/")
      .then((apiResponse) => apiResponse.json())
      .then((json) => {
            console.log(json);
            console.log(" _ _ _ _ _ _ _ _")
            let data = JSON.stringify(json);
            response.setHeader("Content-Type", "application/json")
            response.end(data);
        });
};


const postRequest = async (req, res) => {

    const quote = prompt("Type here your quote : ");
    console.log(quote);

    await fetch("http://localhost:8000", {
        method: "POST",
        body: JSON.stringify(quote)
    })
        .then((apiResponse) => apiResponse.json())
        .then((json) => {
            console.log(json);
            let data = JSON.stringify(json);
            response.setHeader("Content-Type", "application/json")
            response.end(data);
        })


};

      

const server = http.createServer(handleRequest);
server.listen(port, host, () => {
    console.log(`Welcome to my server`);
});


