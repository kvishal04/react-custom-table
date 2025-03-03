import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "esm", // or 'cjs' if you prefer CommonJS output
  },
  plugins: [resolve(), commonjs(), typescript()],
};
