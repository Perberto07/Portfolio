//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PortfolioLayout from "./MainLayout/PortfolioLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <PortfolioLayout />
        </BrowserRouter>
    </React.StrictMode>
);
