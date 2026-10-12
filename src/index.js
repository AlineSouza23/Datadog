import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // seu CSS global
import App from './App'; // componente principal
import reportWebVitals from './reportWebVitals'; // monitoramento opcional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opcional: medir performance da aplicação
reportWebVitals();
