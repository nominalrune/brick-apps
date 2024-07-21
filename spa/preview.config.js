// import { defineConfig } from "@previewjs/config";
import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import UnpluginTypia from '@ryoppippi/unplugin-typia/vite'
export default defineConfig({
  plugins: [
    remix({
      ssr: false,
    }),
    tsconfigPaths(),
	UnpluginTypia(),
  ],
});
