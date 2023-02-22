"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:${3e3}/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
  });
})();
//# sourceMappingURL=index.js.map
