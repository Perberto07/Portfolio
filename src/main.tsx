//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PortfolioLayout from "./MainLayout/PortfolioLayout";
import { AuthProvider } from './components/Auth/AuthContext';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <PortfolioLayout />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
