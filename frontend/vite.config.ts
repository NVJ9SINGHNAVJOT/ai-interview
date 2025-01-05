import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    plugins: [react(), tsconfigPaths()],
    define: {
      "process.env.REACT_APP_ENVIRONMENT": JSON.stringify(env.REACT_APP_ENVIRONMENT),
      "process.env.SERVER_KEY": JSON.stringify(env.SERVER_KEY),
      "process.env.REACT_APP_BASE_URL_SERVER": JSON.stringify(env.REACT_APP_BASE_URL_SERVER),
    },
  };
});
