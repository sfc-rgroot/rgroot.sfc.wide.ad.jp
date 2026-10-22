import { App } from "./App";
import ReactDOMServer from "react-dom/server";
import * as React from "react";
export async function render() {
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
