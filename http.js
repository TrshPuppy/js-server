const http = require("node:http");

const seenWords = [];
const host = "0.0.0.0";

const port = 8080;

const requestListener = (request, response) => {
  if (request.method === "POST") {
    if (request.url === "/words") {
      let body = "";

      request.on("data", (data) => {
        body += data.toString();
      });

      request.on("end", () => {
        if (seenWords.includes(body)) {
          response.writeHead(200);
          response.end("OK");
        } else {
          seenWords.push(body);
          response.writeHead(418);
          response.end("I'm a teapot");
        }
      });
      return;
    }
    response.writeHead(400);
    response.end("Bad Request");
    return;
  }
  response.writeHead(405);
  response.end("Method not Allowed");
  return;
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log("The server is up and listening...");
});
