import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  TelemetryProvider,
} from "./contexts/TelemetrySocketContext.tsx";
import { AlertProvider } from './contexts/AlertContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelemetryProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </TelemetryProvider>
  </StrictMode>

)
