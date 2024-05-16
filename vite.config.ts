import {resolve} from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({  
  plugins: [
    react({}), 
    dts({
      entryRoot: resolve(__dirname, "lib"),
    })
  ],
  resolve: {
    alias: {
      '@/': new URL('./example/', import.meta.url).pathname
    }
  },
  build:{
    minify: "esbuild",
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "reactidate",
      fileName: (format) => `reactidate.${format}.js`,
      formats: ['umd','es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library

      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  }
})
