import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
export default defineConfig({
  plugins: [
    remix({
      ssr: false,
    }),
	UnpluginTypia(),
    tsconfigPaths(),
  ],
});
