import { injectHook } from "./hook";
import Bridge from "../../../src/bridge";
import { initBackend } from "../../../src/backend";

export function initDevtools() {
  console.log("webpack-build working on backend (2)");
  injectHook(); // Creates __APOLLO_DEVTOOLS_GLOBAL_HOOK__ on page window
  return createConnection(); // Creates connection to devtools app
}

export function createConnection() {
  const ws = new WebSocket("ws://localhost:8098");
  ws.onopen = evt => {
    console.info("backend: websocket connected");
  };
  ws.onclose = evt => console.log("DISCONNECTED");
  ws.onmessage = evt => {
    console.info(
      `backend received data [no bridge]: ${JSON.stringify(evt.data)}`,
    );
  };
  ws.onerror = evt => console.log(`ERROR: ${evt.data}`);

  const bridge = new Bridge({
    listen(fn) {
      ws.onmessage = evt => {
        console.info(`backend received data from bridge: "${evt.data}"`);
        const unpackedData = JSON.parse(evt.data);
        fn(unpackedData);
      };
    },
    send(data) {
      const packedData = JSON.stringify(data);
      console.info(`backend sending data to bridge: "${packedData}"`);
      ws.send(packedData);
    },
  });
  bridge.on("shutdown", () => {
    console.warn("backend.bridge.on(shutdown): NYI");
  });

  let started = false;
  const init = () => {
    if (__APOLLO_DEVTOOLS_GLOBAL_HOOK__.ApolloClient) {
      started = true;
      initBackend(bridge, window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__, localStorage);
      return;
    }
    setTimeout(init, 500);
  };
  init();

  return ws;
}
