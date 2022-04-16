import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './hooks/auth';
import { ThemeProvider } from './hooks/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
