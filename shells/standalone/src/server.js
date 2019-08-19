const ws = require("ws");
const http = require("http");

console.log("running server");
//startServer(/*process.env.PORT*/);

// function initialize(socket) {
//   socket.onmessage = evt => {
//     console.info(
//       `Received data (devtools, pre-init): ${JSON.stringify(evt.data)}`,
//     );
//   };
// }

export function startServer(onSocket, port = 8098) {
  const httpServer = http.createServer();
  const server = new ws.Server({ server: httpServer });
  let connected = false;

  server.on("connection", socket => {
    console.log(`CONNECTION`);

    if (connected) {
      connected.close();
      console.warn(
        "Only one connection allowed at a time, closing previous connection.",
      );
    }
    connected = socket;
    socket.onError = err => {
      connected = false;
      //onDisconnected();
      console.error("Error with websocket connection", err);
    };
    socket.onClose = err => {
      connected = false;
      //onDisconnected();
      console.log("Socket connection closed");
    };
    socket.onmessage = evt => {
      console.info(`Received data (devtools): ${evt.data}`);
      const unpackedData = JSON.parse(evt.data);
    };
    // initialize(socket);
    onSocket(socket);
  });

  server.on("error", e => {
    //TODO
    //onError(e)
    console.error("Failed to start DevTools server", e);
    //restartTimeout = setTimeout(() => startServer(port), 1000);
  });

  httpServer.on("request", (req, res) => {
    // TODO: Server a file that sets up the connection
    res.end('console.log("TODO: put client connection code here");');
  });

  httpServer.on("error", e => {
    //TODO
    //onError(e)
    //onStatusChange('failed to start the server.');
    //restartTimeout...
  });

  httpServer.listen(port, () => {
    console.log(`The server is listening on the port ${port}.`);
  });

  return {
    close: () => {
      connected = false;
      //onDisconnected()
      server.close();
      httpServer.close();
    },
  };
}

// function connectToSocket(socket) {
//   socket.onerror = err => {
//     //TODO
//     //onDisconnected();
//     console.error("Error with websocket connection", err);
//   };
//   socket.onclose = () => {
//     //TODO
//     //onDisconnected();
//     console.log("Connection closed");
//   };
//   initialize(socket);
//   return {
//     close: () => {
//       //TODO
//       //onDisconnected();
//     },
//   };
// }
