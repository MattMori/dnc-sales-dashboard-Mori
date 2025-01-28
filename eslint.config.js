import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: eslintParserTypeScript,
        },
        plugins: {
            "@typescript-eslint": eslintPluginTypeScript,
            "react-refresh": eslintPluginReactRefresh,
        },
        rules: {
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
];
