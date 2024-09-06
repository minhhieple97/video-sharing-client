interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SOCKET_URL: string;
}

interface ImportMeta {
  env: Record<string, string>;
}
