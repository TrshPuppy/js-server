# This is a simple HTTP server made using node

It listens on port 8080 on the localhost (127.0.0.1) for a POST request to the "/words" endpoint.

If the data in the request is a word we haven't seen before, the server responds with the status code "418 I'm a teapot."

If the data in the request is a word we have seen before, the server responds with the status code "200 OK."

## Docker Commands:

```
docker build -t server .
```

```
docker run --name server --network host server
```

I had an issue trying to run `docker run --name server -p 127.0.0.1:8080:8080 server`. Curl would respond with `curl (56) Recv failure: Connection reset by peer` even when `docker ps` showed:

```
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                      NAMES
xxxxxxxxxxxx   server    "docker-entrypoint.s…"   15 seconds ago   Up 15 seconds   127.0.0.1:8080->8080/tcp   server
```

I think this has something to do with my environment over anything else. According to Docker's documentation, there's no reason this shouldn't have worked.

## Other notes:

Additionally, during the interview, the code I had written had a bug in which the server would always return "OK" even when it had never seen a word before. That's because I was handling the logic outside of the `request.on("end",())` function. Since `request.on("data",())` is asynchronous, the logic I had written outside of it was garbage because it was executing before the request data was finished sending. This is fixed now that I've added the `request.on("end",())` listeneer.

## Thank you again for today's interview. I appreciate all the time and consideration you've given me as an applicant, and I hope I can repay you all in the future with some good work!

-Rose P.
