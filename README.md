# This is a simple HTTP server made using node

It listens on port 8080 on 0.0.0.0 for a POST request to the "/words" endpoint.

If the data in the request is a word we haven't seen before, the server responds with the status code "418 I'm a teapot."

If the data in the request is a word we have seen before, the server responds with the status code "200 OK."

## Docker Commands:

```
docker build -t server .
```

```
docker run -p 0.0.0.0:8080:8080 --name server server
```
## Curl command:
```
curl -X POST http://127.0.0.1:8080/words --data hi --verbose
```

## Notes:
During the interview, I was unaware of the fact that `localhost` from within the Docker container does **not** connect to the `localhost` of the host. That's why I was unable to connect to the server once it was running from inside Docker. To fix this, I've changed the `host` variable in `http.js` to `0.0.0.0`. The Docker command also has to reflect this.

Additionally, the code I had written had a bug in it which the server would always return "OK" even when it had never seen a word before. 

That was because I was handling the logic outside of the `request.on("end",())` function. Since `request.on("data",())` is asynchronous, the logic I had written outside of it was garbage because it was executing before the request data was finished sending. This is fixed now that I've added the `request.on("end",())` listener.

