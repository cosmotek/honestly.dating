/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Where waitlist signups are POSTed. Unset = stub mode. */
  readonly VITE_WAITLIST_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
