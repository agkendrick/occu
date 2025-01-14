import * as React from 'react'
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';

if(!window.IS_PRODUCTION) {
    new EventSource('/esbuild').addEventListener('change', () => location.reload())
}

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter> 
);