// Must stay an interface: it merges into Vite's own ImportMetaEnv, which a type cannot do
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}
