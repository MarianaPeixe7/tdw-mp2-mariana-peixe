import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser
    },
    extends: [
      js.configs.recommended,       
      pluginReact.configs.flat.recommended 
    ],
    settings: {
      react: { version: "detect" }  
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "warn"        
    }
  },
  {
  files: ["src/tests/**/*.{js,jsx}"],
  languageOptions: {
    globals: {
      test: "readonly",
      expect: "readonly"
    }
  }
}
]);
