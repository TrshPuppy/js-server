# This is a simple HTTP server made using node

It listens on port 8080 on the localhost (0.0.0.0) for a POST request to the "/words" endpoint.

If the data in the request is a word we haven't seen before, the server responds with the status code "418 I'm a teapot."

If the data in the request is a word we have seen before, the server responds with the status code "200 OK."

## Docker Commands:

```
docker build -t server .
```

```
docker run -p 0.0.0.0:8080:8080 --name server server
```

I had an issue trying to run this container with the `--publish` switch. Curl would respond with `curl (56) Recv failure: Connection reset by peer` even when `docker ps` showed:

```
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                      NAMES
xxxxxxxxxxxx   server    "docker-entrypoint.s…"   15 seconds ago   Up 15 seconds   127.0.0.1:8080->8080/tcp   server
```

I think this has something to do with my environment over anything else. According to Docker's documentation, there's no reason this shouldn't have worked.

## Other notes:

Additionally, during the interview, the code I had written had a bug in it which the server would always return "OK" even when it had never seen a word before. 

That was because I was handling the logic outside of the `request.on("end",())` function. Since `request.on("data",())` is asynchronous, the logic I had written outside of it was garbage because it was executing before the request data was finished sending. This is fixed now that I've added the `request.on("end",())` listener.

