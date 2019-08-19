// TODO(mike): implement this. I think it's graphiql code is preserved.

// Expects a chrome.storage
// [`StorageArea`](https://developer.chrome.com/apps/storage#type-StorageArea)
// input and exports a
// [Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface
class StorageAdapter {
  constructor(storage) {}

  fakeKVStore = {};

  // This is the magic that connects chrome's `StorageArea` interface to the
  // browser's `Storage` (ie localStorage).
  //
  // It's legal (and happens often) that we write multiple times _before_ the
  // async write operation completes. Our goal is to make sure that writes are
  // committed in order. When we write tests, this is what should be tested
  // explicitly.
  updateRemoteStorage = () => {};

  getItem = keyName => {
    console.warn("createStorageAdapter:getItem not implemented");
    return this.fakeKVStore[keyName];
  };

  setItem = (keyName, value) => {
    console.warn("createStorageAdapter:getItem not implemented");
    this.fakeKVStore[keyName] = value;
  };

  removeItem = keyName => {
    console.warn("createStorageAdapter:getItem not implemented");
    delete this.fakeKVStore[keyName];
  };

  clear = () => {
    console.warn("createStorageAdapter:getItem not implemented");
    this.fakeKVStore = {};
  };
}

// We only export a factory function because we need to enforce the consumer
// uses the `readyCallback`. We have to asynchronously read from the chrome
// storage to prime the local cache, so this needs to use an async callback.
export function createStorageAdapter(storageArea, readyCallback) {
  if (typeof readyCallback !== "function") {
    throw new Error(
      "You must pass a `readyCallback` function to `createStorageAdapter`",
    );
  }
  const storageAdapter = new StorageAdapter(storageArea);
  readyCallback(storageAdapter);
}
