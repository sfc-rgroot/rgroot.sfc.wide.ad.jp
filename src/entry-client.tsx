"use client";
import { App } from "./App";
import { hydrateRoot } from "react-dom/client";
import "./global.css";
import * as serviceWorker from "./serviceWorker";
import * as React from "react";

const container = document.getElementById("root")!;
hydrateRoot(
    container,
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

serviceWorker.unregister();
