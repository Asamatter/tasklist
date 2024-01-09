import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

import { BrowserRouter  } from 'react-router-dom'



const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  console.error('Root element with id "root" not found.');
}