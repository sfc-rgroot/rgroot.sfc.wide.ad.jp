import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "rolldown";
import { parseAst } from "rolldown/parseAst";

function preserveUseClientDirective(): Plugin {
    const useClientFiles = new Set<string>();

    return {
        name: "preserve-use-client-directive",
        onLog(_level, log) {
            if (
                log.code === "DIRECTIVE_NOT_PRESERVED" ||
                /use client.*may not be preserved/i.test(log.message ?? "")
            ) {
                return false;
            }
        },

        transform(code, id) {
            if (!code.includes("use client")) return;
            const ast = parseAst(code);
            const first = ast.body[0];
            if (first?.type !== "ExpressionStatement") return;
            const expr = first.expression as { type: string; value?: unknown };
            if (
                (expr.type === "StringLiteral" || expr.type === "Literal") &&
                expr.value === "use client"
            ) {
                useClientFiles.add(id);
            }
        },

        generateBundle(_options, bundle) {
            for (const fileData of Object.values(bundle)) {
                if (
                    fileData.type === "chunk" &&
                    fileData.moduleIds.some((id) => useClientFiles.has(id))
                ) {
                    fileData.code = `"use client";\n${fileData.code}`;
                }
            }
        },
    };
}

export default defineConfig({
    build: {
        outDir: "dist/static",
    },
    plugins: [tailwindcss(), preserveUseClientDirective()],
});
