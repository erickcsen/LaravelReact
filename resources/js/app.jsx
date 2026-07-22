import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './pages/Page';

let app = document.getElementById('app');
let pagename = app.dataset.page;
console.log(document.getElementById('app').dataset.page);
ReactDOM.createRoot(app).render(
    <React.StrictMode>
        <Page pagename={pagename} />
    </React.StrictMode>
);
