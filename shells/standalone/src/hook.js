// This script is injected into every page.
import { installHook } from "../../../src/backend/hook";
import { version as devToolsVersion } from "../../webextension/manifest.json";

// inject the hook
export function injectHook() {
  if (!!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
    return;
  }
  installHook(window, devToolsVersion);
}
