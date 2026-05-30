import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), deno()],
	resolve: {
		alias: {
			"@": Deno.cwd() + "/src",
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3333",
				secure: false,
			},
			"/uploads": {
				target: "http://localhost:3333",
				secure: false,
			},
		},
	},
});
