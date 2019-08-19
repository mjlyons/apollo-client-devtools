import { createStorageAdapter } from "./storage-adapter";
import { initDevTools } from "src/devtools";
import Bridge from "src/bridge";
import { startServer } from "./server";

startServer(socket => {
  createStorageAdapter(null, storage => {
    initDevTools({
      connect(cb) {
        // TODO: implement
        const bridge = new Bridge({
          listen(dataHandler) {
            console.info("devtools:listen");
            console.log(dataHandler);

            socket.onmessage = evt => {
              console.info(
                `Devtools received data from bridge: "${evt.data}}"`,
              );
              const unpackedData = JSON.parse(evt.data);
              dataHandler(unpackedData);
            };
          },
          send(data) {
            const packedData = JSON.stringify(data);
            console.info(`Devtools sending data over bridge: "${packedData}"`);
            socket.send(packedData);
          },
        });

        cb(bridge);
      },

      onReload(reloadFn) {
        console.warn("implement devtools:onReload");
      },

      storage,
    });
  });
});
