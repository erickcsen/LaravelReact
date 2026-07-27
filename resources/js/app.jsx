import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Page from "./pages/Page";

const app = document.getElementById("app");
const pagename = app.dataset.page;

ReactDOM.createRoot(app).render(
    <React.StrictMode>
        <BrowserRouter>
            <Page pagename={pagename} />
        </BrowserRouter>
    </React.StrictMode>
);
