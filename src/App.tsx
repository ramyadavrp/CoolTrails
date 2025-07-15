import React from 'react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import AppRoute from './routes/AppRoute';



export default function App() {
  return <AppRoute />;
}
