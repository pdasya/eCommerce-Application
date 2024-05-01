import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.append(root);

const app = createRoot(root);

app.render(<App />);