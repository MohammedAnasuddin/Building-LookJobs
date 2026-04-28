import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { queryClient } from "./lib/queryClient";

// 🔥 TanStack persistence
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// ✅ create persister
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
      maxAge: 1000 * 60 * 60, // 1 hour
    }}
  >
    <App />
  </PersistQueryClientProvider>
);