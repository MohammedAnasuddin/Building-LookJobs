import { ReactNode } from "react"

import {
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client"

import {
  createSyncStoragePersister,
} from "@tanstack/query-sync-storage-persister"

import { queryClient } from "@/shared/lib/query-client"

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

type QueryProviderProps = {
  children: ReactNode
}

export function QueryProvider({
  children,
}: QueryProviderProps) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}